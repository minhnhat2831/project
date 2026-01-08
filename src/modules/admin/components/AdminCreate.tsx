import { useForm } from "react-hook-form";
import InputField from "@/components/common/form/Input";
import Select from "@/components/common/form/Select";
import { toast } from "react-toastify";
import { CreateAdmin } from "../api/api";
import Button from "@/components/common/form/Button";
import { Icons } from "@/components/common/base/Icon";
import { useRefetchData } from "@/hooks/useRefetch";
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateAdminUserSchema, type AdminFormCreate } from "../util/AdminUserSchema";

interface prop {
    open: boolean,
    setOpen: (open: boolean) => void,
}

export default function AdminCreatePopup({ open, setOpen }: prop) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<AdminFormCreate>({
        resolver: zodResolver(CreateAdminUserSchema)
    })

    const { refetch } = useRefetchData()
    const onsubmit = async (data: AdminFormCreate) => {
        try {
            const response = await CreateAdmin(data)
            toast.success(response?.message)
            refetch?.()
            setOpen(false)
        } catch (error: any) {
            const message = error.response?.data?.message
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
            toast.error("Tạo admin thất bại");
        }
    }

    return (<>
        <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
            <p className="text-xl">Create Admin User</p>
            <Button
                variant="close"
                size="sm"
                onClick={() => setOpen(!open)}><Icons.Close />
            </Button>
        </div>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col h-full">
            <div className="py-2 h-6/9 flex-1">
                <InputField
                    label="UserName"
                    inputSize="lg"
                    placeholder="Username"
                    {...register("username")}
                    error={errors.username?.message}>
                </InputField>
                <div className="flex gap-15">
                    <InputField
                        label="First Name"
                        inputSize="lg"
                        placeholder="First name"
                        {...register("firstName")}
                        error={errors.firstName?.message}>
                    </InputField>
                    <InputField
                        label="Last Name"
                        inputSize="lg"
                        placeholder="Last name"
                        {...register("lastName")}
                        error={errors.lastName?.message}>
                    </InputField>
                </div>

                <InputField
                    label="Email"
                    type="email"
                    inputSize="lg"
                    placeholder="Email"
                    {...register("email")}
                    error={errors.email?.message}
                >
                </InputField>

                <Select
                    label="Status"
                    {...register("status")}
                    error={errors.status?.message}
                >
                    <option value='' hidden>Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>

                <InputField
                    label="Password"
                    type="password"
                    inputSize="lg"
                    placeholder="Password"
                    {...register("password")}
                    error={errors.password?.message}>
                </InputField>
            </div>
            <div className="px-6 py-4 mt-auto border-t bg-white">
                <Button
                    type="submit"
                    variant="create">
                    Create
                </Button>
            </div>
        </form>
    </>)
}