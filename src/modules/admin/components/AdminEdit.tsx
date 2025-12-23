import { useForm } from "react-hook-form"
import InputField from "@/components/common/form/Input"
import Select from "@/components/common/form/Select"
import { toast } from "react-toastify"
import { EditAdmin } from "../api/api"
import type { EditAdminResquest } from "../types/EditAdmin"
import type { Admin } from "../types/Admin"
import Button from "@/components/common/form/Button"

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    admin: Admin,
    onSuccess? : () => void
}

export default function AdminEditPopup({ open, setOpen, admin,onSuccess }: Props) {
    const { register, handleSubmit, formState: { errors } } =
        useForm<EditAdminResquest>({
            defaultValues: {
                username: admin.username,
                firstName: admin.firstName,
                lastName: admin.lastName,
                email: admin.email,
                status: admin.status,
            },
        })

    const onSubmit = async (data: EditAdminResquest) => {
        try {
            await EditAdmin(data, admin.id)
            toast.success("Cập nhật admin thành công")
            onSuccess?.()
            setOpen(false)
        } catch {
            toast.error("Cập nhật admin thất bại")
        }
    }

    return (
        <>
            <div className="w-full border-b px-5 flex justify-between items-center h-15">
                <p className="text-2xl font-bold">Edit Admin User</p>
                <button className="hover:bg-gray-200 font-bold rounded-l-lg w-5" onClick={() => setOpen(false)}>X</button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <div className="px-2">
                    <label className="block mb-1">Username<span className="text-red-500">*</span></label>
                    <input
                        disabled
                        className="bg-gray-200 border w-full h-10 pl-2 pr-2 rounded shadow-md"
                        {...register("username")}
                    />
                </div>


                <div className="flex">
                    <InputField
                        label="First Name"
                        {...register("firstName", { required: true })}
                        error={errors.firstName?.message}
                    />
                    <InputField
                        label="Last Name"
                        {...register("lastName", { required: true })}
                        error={errors.lastName?.message}
                    />
                </div>

                <div className="px-2">
                    <label className="block mb-1">email<span className="text-red-500">*</span></label>
                    <input
                        disabled
                        className="bg-gray-200 border w-full h-10 pl-2 pr-2 rounded shadow-md"
                        {...register("email")}
                    />
                </div>

                <Select label="Status" {...register("status")}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>

                <InputField
                    label="Password"
                    type="password"
                    {...register("password")}
                    error={errors.password?.message}
                />

                <div className="px-2 mt-8">
                    <Button>Update</Button>
                </div>

            </form>
        </>
    )
}
