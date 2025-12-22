import { useForm } from "react-hook-form";
import InputField from "../../../components/common/form/Input";
import Select from "../../../components/common/form/Select";
import type { CreateAdminRequest } from "../types/CreateAdmin";
import { toast } from "react-toastify";
import { CreateAdmin } from "../api/api";
import Button from "../../../components/common/form/Button";
import { useState } from "react";
import PopupConfirm from "../../../components/common/PopupComfirm";

interface prop {
    open: boolean, 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSuccess? : () => void
}

export default function AdminCreatePopup({ open, setOpen, onSuccess }: prop) {
    const [comfirm , setComfirm] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<CreateAdminRequest>({
        defaultValues: {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            status: "active",
            email: ""
        }
    })

    const onsubmit = async (data: CreateAdminRequest) => {
        try {
            console.log(data)
            const res = await CreateAdmin(data)
            console.log(res)
            toast.success("Tạo admin thành công")
            onSuccess?.()
            setOpen(false)
        } catch (error: any) {
            (error.response?.data?.message);
            toast.error("Tạo admin thất bại")
        }
    }

    return (<>
        <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
            <p className="text-2xl font-bold">Create Admin User</p>
            <button className="hover:bg-gray-200 font-bold rounded-l-lg w-5" onClick={() => setOpen(!open)}>X</button>
        </div>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col h-full">
            <div className="py-2 px-5 h-6/9 flex-1">
                <InputField
                    label="UserName"
                    placeholder="Username"
                    {...register("username", {
                        required: "Username is required",
                    })}
                    error={errors.username?.message}>
                </InputField>
                <div className="flex">
                    <InputField
                        label="First Name"
                        placeholder="First name"
                        {...register("firstName", {
                            required: "firstName is required",
                        })}
                        error={errors.firstName?.message}>
                    </InputField>
                    <InputField
                        label="Last Name"
                        placeholder="Last name"
                        {...register("lastName", {
                            required: "lastName is required",
                        })}
                        error={errors.lastName?.message}>
                    </InputField>
                </div>

                <InputField
                    label="Email"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                        required: "email is required",
                    })}
                    error={errors.email?.message}
                >
                </InputField>

                <Select
                    label="Status"
                    {...register("status", {
                        required: "status is required",
                    })}
                    error={errors.status?.message}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>

                <InputField
                    label="Password"
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters long"
                        }
                    })}
                    error={errors.password?.message}>
                </InputField>
            </div>
            <div className="px-6 py-4 mt-auto border-t bg-white">
                <Button>Create</Button>
            </div>
        </form>
        <PopupConfirm open={comfirm} onOpenChange={setComfirm}>
            <div>

            </div>
        </PopupConfirm>
    </>)
}