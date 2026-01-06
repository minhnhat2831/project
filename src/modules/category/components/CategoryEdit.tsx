import Image from "@/components/common/form/Image"
import type { Category } from "../types/Category"
import Select from "@/components/common/form/Select"
import InputField from "@/components/common/form/Input"
import Button from "@/components/common/form/Button"
import { Icons } from "@/components/common/base/Icon"
import { useRefetchData } from "@/hooks/useRefetch"
import type { EditCategoryRequest } from "../types/CategoryEdit"
import { EditCategory } from "../api/api"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import useCategoryId from "../hooks/useCategoryId"

interface props {
    open: boolean,
    setOpen: (open: boolean) => void,
    category: Category
}

export default function CategoryEdit({ open, setOpen, category }: props) {
    const { data } = useCategoryId(category.id)
    const { register, handleSubmit, setError, control, formState: { errors } } = useForm<EditCategoryRequest>({
        values : data ? {
            title: data.title,
            name: data.name,
            status: data.status,
            image: data.picture?.uri
        } : undefined 
    })
    const { refetch } = useRefetchData()
    const onSubmit = async (data: EditCategoryRequest) => {
        try {
            const response = await EditCategory(category.id, data)
            toast.success(response?.message)
            refetch?.()
            setOpen(false)
        } catch (err: any) {
            const message = err.response?.data?.message
            if (message.toLowerCase().includes("title")) {
                setError("title", {
                    type: "server",
                    message
                })
                return
            }
            if (message.toLowerCase().includes("name")) {
                setError("name", {
                    type: "server",
                    message
                })
                return
            }
            if (message.toLowerCase().includes("status")) {
                setError("status", {
                    type: "server",
                    message
                })
                return
            }
            if (message.toLowerCase().includes("image")) {
                setError("image", {
                    type: "server",
                    message
                })
                return
            }
        }
    }

    return (<>
        <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
            <p className="text-xl">Create Category</p>
            <button className="font-bold rounded-full mr-2 cursor-pointer hover:bg-gray-200 w-6" onClick={() => setOpen(!open)}><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-auto">
            <div className="py-2 px-2 h-6/9 flex-1 overflow-auto">
                <InputField
                    label="Title"
                    placeholder="Title"
                    inputSize="lg"
                    {...register("title", {
                        required: "This field is required"
                    })}
                    error={errors.title?.message}>
                </InputField>

                <InputField
                    label="Name"
                    placeholder="Name"
                    inputSize="lg"
                    {...register("name", {
                        required: "This field is required"
                    })}
                    error={errors.name?.message}>
                </InputField>

                <Select
                    label="Status"
                    {...register("status", {
                        required: "This field is required"
                    })}
                    error={errors.status?.message}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>

                <Image
                    name="image"
                    label="Image"
                    control={control}
                    error={errors.image?.message}
                />

            </div>
            <div className="px-6 py-4 mt-auto border-t bg-white">
                <Button
                    type="submit"
                    variant="create">
                    Create
                </Button>
            </div>
        </form >
    </>)
}