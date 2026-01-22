import PopupCE from "@/components/common/base/PopupCE"
import Button from "@/components/common/form/Button"
import Image from "@/components/common/form/Image"
import InputField from "@/components/common/form/Input"
import SelectForm from "@/components/common/form/SelectForm"
import { useModalStore } from "@/hooks/useModalStore"
import { useCategoryStore } from "../store/useSelectedCategory"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Icons } from "@/components/common/base/Icon"
import { toast } from "react-toastify"
import useCategory from "../hooks/useCategory"
import { categoryRequestSchemas } from "../schema/CategorySchema"
import type { categoryRequest } from "../schema/CategorySchema.type"

interface props {
    type: "create" | "edit"
}

export default function CategoryFormModal({ type }: props) {
    const { open, setOpen, typeMode } = useModalStore()
    const isEdit = typeMode === "edit"
    const { selectedCategory } = useCategoryStore()
    const { useCreateCategory, useEditCategory, useCategoryDetail } = useCategory()
    const { data: categoryId } = useCategoryDetail(isEdit ? selectedCategory?.id : "")
    const { register, handleSubmit, setError, reset, control, formState: { errors } } = useForm<categoryRequest>({
        resolver: zodResolver(categoryRequestSchemas),
        values: {
            title: categoryId?.title ?? "",
            name: categoryId?.name ?? "",
            status: categoryId?.status ?? "",
            image: categoryId?.picture?.uri ?? ""
        }
    })

    const onSubmit = async (data: categoryRequest) => {
        try {
            if (isEdit && type === "edit") {
                if (!categoryId) return
                useEditCategory.mutate({ id: categoryId.id, data: data }, {
                    onSuccess: () => {
                        reset(data)
                        setOpen(false)
                    },
                    onError: (err: any) => {
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
                })
            } else {
                useCreateCategory.mutate(data, {
                    onSuccess: () => {
                        reset()
                        setOpen(false)
                    },
                    onError: (err: any) => {
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
                })
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message)
        }
    }

    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
                <p className="text-xl">{isEdit ? "Edit Category" : "Create Category"}</p>
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => {
                        setOpen(!open)
                        reset()
                    }}><Icons.Close />
                </Button>
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

                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <SelectForm
                                label="Status"
                                options={[
                                    { value: "active", label: "Active" },
                                    { value: "inactive", label: "Inactive" },
                                ]}
                                value={
                                    field.value
                                        ? { value: field.value, label: field.value }
                                        : null
                                }
                                onChange={(option) => field.onChange(option?.value)}
                                error={errors.status?.message}
                            />
                        )}
                    />

                    <Image
                        name="image"
                        label="Image"
                        control={control}
                        error={errors.image?.message}
                        defaultImage={isEdit ? selectedCategory?.picture?.uri ?? categoryId?.picture?.uri ?? "" : ""}
                    />

                </div>
                <div className="px-6 py-4 mt-auto border-t bg-white">
                    <Button
                        type="submit"
                        variant="create">
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form >
        </PopupCE>
    </>)
}