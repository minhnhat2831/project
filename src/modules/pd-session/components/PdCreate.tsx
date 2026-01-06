import Button from "@/components/common/form/Button"
import TextArea from "@/components/common/form/TextArea"
import Image from "@/components/common/form/Image"
import InputField from "@/components/common/form/Input"
import Select from "@/components/common/form/Select"
import { toast } from "react-toastify"
import { Createpd } from "../api/api"
import { useRefetchData } from "@/hooks/useRefetch"
import { useCategoryData } from "@/hooks/useCategoryData"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/common/Icon"
import type { PdCreateRequest } from "../types/PdCreate"

interface prop {
    open: boolean,
    setOpen: (open: boolean) => void,
}

export default function PdCreate({ open, setOpen }: prop) {
    const { register, handleSubmit, setError, control, formState: { errors } } = useForm<PdCreateRequest>({
        defaultValues: {
            title: "",
            content: "",
            picture: "",
            status: "",
            timeToRead: "",
            categoryId: "",
            author: "",
            type: "pd"
        }
    })
    const { data: category } = useCategoryData()
    const { refetch } = useRefetchData()

    const onSubmit = async (data: PdCreateRequest) => {
        try {
            const response = await Createpd(data)
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
            if (message.toLowerCase().includes("author")) {
                setError("author", {
                    type: "server",
                    message
                })
                return
            }
            if (message.toLowerCase().includes("category")) {
                setError("categoryId", {
                    type: "server",
                    message
                })
                return
            }
            if (message.toLowerCase().includes("timeToRead")) {
                setError("timeToRead", {
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
            if (message.toLowerCase().includes("picture")) {
                setError("picture", {
                    type: "server",
                    message
                })
                return
            }
            if (message.toLowerCase().includes("content")) {
                setError("content", {
                    type: "server",
                    message
                })
                return
            }
        }
    }
    return (<>
        <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
            <p className="text-xl">Create Pd-Session</p>
            <button className="font-bold rounded-full mr-2 cursor-pointer hover:bg-gray-200 w-6" onClick={() => setOpen(!open)}><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-auto">
            <div className="py-2 px-2 h-6/9 flex-1 overflow-auto">
                <InputField
                    label="Title"
                    variant="form"
                    inputSize="lg"
                    placeholder="Title"
                    {...register("title", {
                        required: "This field is required",
                    })}
                    error={errors.title?.message}>
                </InputField>
                <InputField
                    label="Author"
                    variant="form"
                    inputSize="lg"
                    placeholder="Author"
                    {...register("author", {
                        required: "This field is required",
                    })}
                    error={errors.author?.message}>
                </InputField>
                <Select label="Status"
                    {...register("status", {
                        required: "This field is required"
                    })}
                    error={errors.status?.message}>
                    <option value="" hidden>Select Status</option>
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                    <option value="draft">Draft</option>
                </Select>

                <Select label="Category"
                    {...register("categoryId", {
                        required: "This field is required"
                    })}
                    error={errors.categoryId?.message}>
                    {category.map((category, index) => (
                        <>
                            <option value="" hidden>Select</option>
                            <option key={index} value={category.id}>{category.name}</option>
                        </>
                    ))}
                </Select >

                <InputField
                    label="Duration (Ex: 3 mins) "
                    variant="form"
                    inputSize="lg"
                    type="number"
                    placeholder="Time To Read"
                    {...register("timeToRead", {
                        required: "This field is required",
                    })}
                    error={errors.timeToRead?.message}>
                </InputField>
                <Image
                    name="image"
                    label="Image"
                    control={control}
                    error={errors.picture?.message}
                />

                <TextArea
                    label="Content"
                    placeholder="Write article content..."
                    {...register("content", {
                        required: "This field is required",
                    })}
                    error={errors.content?.message}
                />

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