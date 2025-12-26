import { useForm } from "react-hook-form";
import InputField from "@/components/common/form/Input";
import Select from "@/components/common/form/Select";
import type { CreateAdminRequest } from "../types/CreateAdmin";
import { toast } from "react-toastify";
import { CreateAdmin } from "../api/api";
import Button from "@/components/common/form/Button";
import { useState } from "react";
import PopupConfirm from "@/components/common/PopupComfirm";
import { Icons } from "@/components/common/Icon";

interface prop {
    open: boolean,
    setOpen: (open : boolean) => void,
    onSuccess?: () => void
}

export default function AdminCreatePopup({ open, setOpen, onSuccess }: prop) {
    const [comfirm, setComfirm] = useState(false)
    const { register, handleSubmit, setError, formState: { errors } } = useForm<CreateAdminRequest>({
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
            const response = await CreateAdmin(data)
            toast.success(response?.message)
            onSuccess?.()
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

            if (message.toLowerCase().includes("password")) {
                setError("password", {
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
            <button className="font-bold rounded-full mr-2 cursor-pointer hover:bg-gray-200 w-6" onClick={() => setOpen(!open)}><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col h-full">
            <div className="py-2 px-5 h-6/9 flex-1">
                <InputField
                    label="UserName"
                    inputSize="lg"
                    placeholder="Username"
                    {...register("username", {
                        required: "Username is required",
                    })}
                    error={errors.username?.message}>
                </InputField>
                <div className="flex">
                    <InputField
                        label="First Name"
                        inputSize="sm"
                        placeholder="First name"
                        {...register("firstName", {
                            required: "firstName is required",
                        })}
                        error={errors.firstName?.message}>
                    </InputField>
                    <InputField
                        label="Last Name"
                        inputSize="sm"
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
                    inputSize="lg"
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
                    inputSize="lg"
                    placeholder="Password"
                    {...register("password", {
                        required: "password is required",
                    })}
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
        <PopupConfirm open={comfirm} onOpenChange={setComfirm}>
            <div>

            </div>
        </PopupConfirm>
    </>)
}