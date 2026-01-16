import { CreateAdminUserSchema, EditAdminUserSchema, type AdminFormCreate, type AdminFormEdit } from "../schema/AdminUserSchema";
import Button from "@/components/common/form/Button";
import PasswordInput from "@/components/common/form/PasswordInput";
import SelectForm from "@/components/common/form/Select";
import InputField from "@/components/common/form/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/hooks/useModalStore";
import PopupCE from "@/components/common/base/PopupCE";
import { Icons } from "@/components/common/base/Icon";
import { useAdminStore } from "../store/useSeletedAdminStore";
import { usePasswordStore } from "@/hooks/usePasswordToggle";
import { useEffect } from "react";
import { useAdminMutation } from "../hooks/useAdminMutation";
import { useAdminDetailQuery } from "../hooks/useAdminDetailQuery";
import { toast } from "react-toastify";

type AdminFormValues = AdminFormCreate | AdminFormEdit;
interface props {
    type: "create" | "edit"
}

export default function AdminFormModal({ type }: props) {
    const { typeMode, setOpen, open } = useModalStore();
    const { openPassword } = usePasswordStore()
    const { selectedAdmin } = useAdminStore()
    const method = useAdminMutation()
    const isEdit = typeMode === "edit";
    const { data: dataDetail } = useAdminDetailQuery(isEdit ? selectedAdmin?.id : undefined);
    const { register, handleSubmit, reset,setError, formState: { errors } } = useForm<AdminFormValues>({
        resolver: zodResolver(
            type === "create" ? CreateAdminUserSchema : EditAdminUserSchema)
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

    const onSubmit = async (data: AdminFormValues) => {
        if (isEdit) {
            if (!dataDetail) return
            method?.editMutation.mutate(
                { data: data as AdminFormEdit, id: dataDetail.id},
                {
                    onSuccess: () => {
                        reset(data)
                        setOpen(false)
                    }
                }
            )
        } else {
            method?.createMutation.mutate(
                data as AdminFormCreate,
                {
                    onSuccess: () => {
                        reset()
                        setOpen(false)
                    },
                    onError: (error: any) => {
                        const message = error.response?.data?.message
                        if (message?.toLowerCase().includes("username")) {
                            setError("username", {
                                type: "server",
                                message,
                            })
                            return
                        }
                        if (message?.toLowerCase().includes("email")) {
                            setError("email", {
                                type: "server",
                                message,
                            })
                            return
                        }
                        toast.error(message)
                    },
                }
            )
        }
    }

    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-15 border-b px-5 flex justify-between items-center">
                {isEdit ? "Edit Admin User" : "Create Admin User"}
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => {
                        setOpen(!open)
                        reset()
                    }
                    }><Icons.Close />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full py-2">
                <InputField
                    label="Username"
                    variant={isEdit ? "disable" : "form"}
                    placeholder="UserName"
                    inputSize="lg"
                    {...register("username")}
                    disabled={isEdit}
                    error={errors.username?.message}
                />

                <div className="flex">
                    <InputField
                        label="First Name"
                        inputSize="lg"
                        placeholder="FirstName"
                        className="mr-10"
                        {...register("firstName")}
                        error={errors.firstName?.message}
                    />
                    <InputField
                        label="Last Name"
                        inputSize="lg"
                        placeholder="LastName"
                        className="mr-10"
                        {...register("lastName")}
                        error={errors.lastName?.message}
                    />
                </div>

                <InputField
                    label="Email"
                    variant={isEdit ? "disable" : "form"}
                    inputSize="lg"
                    placeholder="Email"
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
                    placeholder="Password"
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