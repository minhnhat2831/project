import PopupCE from "@/components/common/base/PopupCE"
import Button from "@/components/common/form/Button"
import Image from "@/components/common/form/Image"
import InputField from "@/components/common/form/Input"
import SelectForm from "@/components/common/form/Select"
import { useModalStore } from "@/hooks/useModalStore"
import { useCategoryStore } from "../store/useSelectedCategory"
import { zodResolver } from "@hookform/resolvers/zod"
import { CategoryRequestSchemas, type CategoryRequest } from "../schema/CategorySchema"
import { useForm } from "react-hook-form"
import { Icons } from "@/components/common/base/Icon"
import { useEffect } from "react"
import { useCategoryDetailQuery } from "../hooks/useCategoryDetailQuery"
import { useCategoryMutation } from "../hooks/useCategoryMutation"
import { toast } from "react-toastify"

interface props {
    type: "create" | "edit"
}

export default function CategoryFormModal({ type }: props) {
    const { open, setOpen, typeMode } = useModalStore()
    const isEdit = typeMode === "edit"
    const { selectedCategory } = useCategoryStore()
    const method = useCategoryMutation()
    const { data: categoryId } = useCategoryDetailQuery(isEdit ? selectedCategory?.id : "")
    const { register, handleSubmit, setError, reset, control, formState: { errors } } = useForm<CategoryRequest>({
        resolver: zodResolver(CategoryRequestSchemas),
        // defaultValues: isEdit ? {
        //     title: categoryId?.title ?? "",
        //     name: categoryId?.name ?? "",
        //     status: categoryId?.status ?? "",
        //     image: categoryId?.picture?.uri ?? ""
        // } : {
        //     title: "",
        //     name: "",
        //     status: "",
        //     image: ""
        // }
    })

    useEffect(() => {
        if (type === "edit" && categoryId) {
            reset({
                title: categoryId?.title ?? "",
                name: categoryId?.name ?? "",
                status: categoryId?.status ?? "",
                image: categoryId?.picture?.uri ?? ""
            });
        }
        if (type === "create") {
            reset({
                title: "",
                name: "",
                status: "",
                image: ""
            })
        }
    }, [categoryId, type, reset]);

    const onSubmit = async (data: CategoryRequest) => {
        try {
            if (isEdit) {
                if (!categoryId) return
                method.editMutation.mutate({ id: categoryId.id, data: data }, {
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
                method.createMutation.mutate(data, {
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

                    <SelectForm
                        label="Status"
                        {...register("status", {
                            required: "This field is required"
                        })}
                        error={errors.status?.message}
                    >
                        <option value="" hidden>Selecte Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </SelectForm>

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