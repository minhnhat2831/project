import { useForm } from "react-hook-form"
import { Icons } from "@/components/common/base/Icon"
import InputField from "@/components/common/form/Input"
import Select from "@/components/common/form/Select"
import Image from "@/components/common/form/Image"
import Button from "@/components/common/form/Button"
import { CreateCategory } from "../api/api"
import { toast } from "react-toastify"
import { useRefetchData } from "@/hooks/useRefetch"
import { zodResolver } from "@hookform/resolvers/zod"
import { type CategoryForm, CategorySchema } from "../util/CategorySchema"

interface props {
    open: boolean,
    setOpen: (open: boolean) => void,
}

export default function CategoryCreate({ open, setOpen }: props) {
    const { register, handleSubmit, setError, control, formState: { errors } } = useForm<CategoryForm>({
        resolver: zodResolver(CategorySchema) as any,
    })
    const { refetch } = useRefetchData()
    const onSubmit = async (data: CategoryForm) => {
        try {
            const category = { ...(data as any) }
            const response = await CreateCategory(category)
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
            <Button
                variant="close"
                size="sm"
                onClick={() => setOpen(!open)}><Icons.Close />
            </Button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-auto">
            <div className="py-2 px-2 h-6/9 flex-1 overflow-auto">
                <InputField
                    label="Title"
                    placeholder="Title"
                    inputSize="lg"
                    {...register("title")}
                    error={errors.title?.message}>
                </InputField>

                <InputField
                    label="Name"
                    placeholder="Name"
                    inputSize="lg"
                    {...register("name")}
                    error={errors.name?.message}>
                </InputField>

                <Select
                    label="Status"
                    {...register("status")}
                    error={errors.status?.message}
                >
                    <option value="" hidden>Select status</option>
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