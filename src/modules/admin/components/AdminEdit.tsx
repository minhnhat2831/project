import { useForm } from "react-hook-form"
import InputField from "@/components/common/form/Input"
import Select from "@/components/common/form/Select"
import { toast } from "react-toastify"
import { EditAdmin } from "../api/api"
import Button from "@/components/common/form/Button"
import { Icons } from "@/components/common/base/Icon"
import type { EditAdminResquest } from "../types/EditAdmin"
import { useAdminIdFetch } from "../hooks/useAdminId"
import type { Admin } from "../types/Admin"
import { useRefetchData } from "@/hooks/useRefetch"

interface Props {
    open: boolean
    setOpen: (open : boolean) => void,
    admin: Admin,
}

export default function AdminEditPopup({ open, setOpen, admin }: Props) {
    const { data } = useAdminIdFetch(admin.id)
    const { refetch } = useRefetchData()
    const { register, handleSubmit,setError, formState: { errors } } =
        useForm<EditAdminResquest>({
            values: data
                ? {
                username: data?.username,
                firstName: data?.firstName,
                lastName: data?.lastName,
                email: data?.email,
                status: data?.status,
            } : undefined,
        })

    const onSubmit = async (data: EditAdminResquest) => {
        try {
            const response = await EditAdmin(data, admin.id)
            refetch?.()
            toast.success(response?.message)
            setOpen(false)
        } catch (error : any) {
            const message = error.response?.data?.message
            if (message.toLowerCase().includes("password")) {
                setError("password", {
                    type: "server",
                    message
                })
                return
            }
            toast.error("Cập nhật admin thất bại")
        }
    }

    return (
        <>
            <div className="w-full border-b px-5 flex justify-between items-center h-15">
                <p className="text-xl">Edit Admin User</p>
                <button className="font-bold rounded-full mr-2 cursor-pointer hover:bg-gray-200 w-6" onClick={() => setOpen(!open)}><Icons.Close /></button>
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
                        {...register("firstName", { required: true })}
                        error={errors.firstName?.message}
                    />
                    <InputField
                        label="Last Name"
                        inputSize="lg"
                        {...register("lastName", { required: true })}
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
