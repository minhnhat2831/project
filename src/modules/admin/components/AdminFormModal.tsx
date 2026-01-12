import { CreateAdminUserSchema, EditAdminUserSchema, type AdminFormCreate, type AdminFormEdit } from "../schema/AdminUserSchema";
import Button from "@/components/common/form/Button";
import PasswordInput from "@/components/common/form/PasswordInput";
import SelectForm from "@/components/common/form/Select";
import InputField from "@/components/common/form/Input";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAdmin, EditAdmin } from "../api/api";
import { useAdminDetail } from "../hooks/useAdminDetail";
import { useModalStore } from "@/hooks/useModalStore";
import PopupCE from "@/components/common/base/PopupCE";
import { Icons } from "@/components/common/base/Icon";
import { useRefetchData } from "@/hooks/useRefetch";
import { useAdminStore } from "../store/useSeletedAdminStore";
import { usePasswordStore } from "@/hooks/usePasswordToggle";
import { useEffect } from "react";

type AdminFormValues = AdminFormCreate | AdminFormEdit;
interface props {
    type: "create" | "edit"
}

export default function AdminFormModal({ type }: props) {
    const { typeMode, setOpen, open } = useModalStore();
    const { openPassword } = usePasswordStore()
    const { selectedAdmin } = useAdminStore()
    const isEdit = typeMode === "edit";
    const { data: dataDetail } = useAdminDetail(isEdit ? selectedAdmin?.id : "");
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<AdminFormValues>({
        resolver: zodResolver(
            type === "create" ? CreateAdminUserSchema : EditAdminUserSchema
        ),
        defaultValues: isEdit ? {
            username: dataDetail?.username ?? "",
            firstName: dataDetail?.firstName ?? "",
            lastName: dataDetail?.lastName ?? "",
            email: dataDetail?.email ?? "",
            status: dataDetail?.status ?? "",
            password: "",
        } : {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            status: "",
            password: "",
        }
    });

    useEffect(() => {
        if (type === "edit" && dataDetail) {
            reset({
                username: dataDetail?.username ?? "",
                firstName: dataDetail?.firstName ?? "",
                lastName: dataDetail?.lastName ?? "",
                email: dataDetail?.email ?? "",
                status: dataDetail?.status ?? "",
                password: "",
            });
        }
        if (type === "create") {
            reset({
                username: "",
                firstName: "",
                lastName: "",
                email: "",
                status: "",
                password: "",
            })
        }
    }, [dataDetail, type, reset]);

    const { refetch } = useRefetchData()
    const onSubmit = async (data: AdminFormValues) => {
        try {
            if (isEdit) {
                if (!dataDetail) return
                const response = await EditAdmin(data as AdminFormEdit, dataDetail.id);
                reset(data)
                toast.success(response.message);
            } else {
                const response = await CreateAdmin(data as AdminFormCreate);
                toast.success(response.message);
            }
            refetch?.()
            setOpen(false);
        } catch (error: any) {
            const message = error.response?.data?.message;
            if (message.toLowerCase().includes("username")) {
                setError("username", {
                    type: "server",
                    message
                })
                return
            }

            if (message.toLowerCase().includes("email")) {
                setError("email", {
                    type: "server",
                    message
                })
                return
            }
            toast.error("Thao tác thất bại");
        }
    };

    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-15 border-b px-5 flex justify-between items-center">
                {isEdit ? "Edit Admin User" : "Create Admin User"}
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => setOpen(!open)}><Icons.Close />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <InputField
                    label="Username"
                    variant={isEdit ? "disable" : "form"}
                    inputSize="lg"
                    {...register("username")}
                    disabled={isEdit}
                    error={errors.username?.message}
                />

                <div className="flex">
                    <InputField
                        label="First Name"
                        inputSize="lg"
                        className="mr-10"
                        {...register("firstName")}
                        error={errors.firstName?.message}
                    />
                    <InputField
                        label="Last Name"
                        inputSize="lg"
                        className="mr-10"
                        {...register("lastName")}
                        error={errors.lastName?.message}
                    />
                </div>

                <InputField
                    label="Email"
                    variant={isEdit ? "disable" : "form"}
                    inputSize="lg"
                    {...register("email")}
                    disabled={isEdit}
                    error={errors.email?.message}
                />

                <SelectForm label="Status" {...register("status")}
                    error={errors.status?.message}>
                    <option value="" hidden>Select status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </SelectForm>

                <PasswordInput
                    label="Password"
                    {...register("password")}
                    showPassword={openPassword}
                    error={errors.password?.message}
                />

                <div className="px-6 py-4 mt-auto border-t bg-white">
                    <Button type="submit" variant={isEdit ? "edit" : "create"}>
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </PopupCE>
    </>
    );
}
