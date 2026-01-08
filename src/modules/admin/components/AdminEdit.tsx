import { useForm } from "react-hook-form"
import InputField from "@/components/common/form/Input"
import Select from "@/components/common/form/Select"
import { toast } from "react-toastify"
import { EditAdmin } from "../api/api"
import Button from "@/components/common/form/Button"
import { Icons } from "@/components/common/base/Icon"
import { useAdminIdFetch } from "../hooks/useAdminId"
import type { Admin } from "../types/Admin"
import { useRefetchData } from "@/hooks/useRefetch"
import { zodResolver } from '@hookform/resolvers/zod'
import { EditAdminUserSchema, type AdminFormEdit } from "../util/AdminUserSchema"

interface Props {
    open: boolean
    setOpen: (open: boolean) => void,
    admin: Admin,
}

export default function AdminEditPopup({ open, setOpen, admin }: Props) {
    const { data } = useAdminIdFetch(admin.id)
    const { refetch } = useRefetchData()

    const { register, handleSubmit, formState: { errors } } =
        useForm<AdminFormEdit>({
            resolver: zodResolver(EditAdminUserSchema),
            values : data ? {
                username : data?.username,
                firstName : data?.firstName,
                lastName : data?.lastName,
                email : data?.email,
                status : data?.status,
                password : ""
            } : undefined
        })

    const onSubmit = async (data: AdminFormEdit) => {
        try {
            const AdminForm = { ...(data as any) }
            const response = await EditAdmin(AdminForm, admin.id)
            refetch?.()
            toast.success(response?.message)
            setOpen(false)
        } catch (error: any) {
            toast.error("Cập nhật admin thất bại")
        }
    }

    return (
        <>
            <div className="w-full border-b px-5 flex justify-between items-center h-15">
                <p className="text-xl">Edit Admin User</p>
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => setOpen(!open)}><Icons.Close />
                </Button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <InputField
                    label="User name"
                    inputSize="lg"
                    variant="disable"
                    {...register("username")}
                    error={errors.username?.message}
                    disabled
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
                    label="User name"
                    variant="disable"
                    inputSize="lg"
                    {...register("email")}
                    error={errors.email?.message}
                    disabled
                />

                <Select label="Status" {...register("status")}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>

                <InputField
                    label="Password"
                    type="password"
                    inputSize="lg"
                    {...register("password")}
                    error={errors.password?.message}
                />

                <div className="px-6 py-4 mt-auto border-t bg-white">
                    <Button type="submit" variant="edit">Update</Button>
                </div>

            </form>
        </>
    )
}
