import { Icons } from "@/components/common/base/Icon"
import Button from "@/components/common/form/Button"
import Image from "@/components/common/form/Image"
import InputField from "@/components/common/form/Input"
import TextArea from "@/components/common/form/TextArea"
import { useArticleStore } from "../store/useSelectedArticle"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useModalStore } from "@/hooks/useModalStore"
import SelectForm from "@/components/common/form/SelectForm"
import PopupCE from "@/components/common/base/PopupCE"
import { toast } from "react-toastify"
import { useCategoryDropDownQuery } from "@/hooks/useCategoryDropDownQuery"
import useArticle from "../hooks/useArticle"
import type { articleRequest } from "../schema/ArticleScheme.type"
import { articleRequestScheme } from "../schema/ArticleScheme"

interface props {
    type: "create" | "edit"
}

export default function ArticleFormModal({ type }: props) {
    const { open, setOpen, typeMode } = useModalStore()
    const isEdit = typeMode === "edit"
    const { selectedArticle } = useArticleStore()
    const { useCreateArticle, useEditArticle, useArticleDetail } = useArticle()
    const { data: articleDetail } = useArticleDetail(isEdit ? selectedArticle?.id : "")
    const { register, handleSubmit, control, reset, setError, formState: { errors } } =
        useForm<articleRequest>({
            resolver: zodResolver(articleRequestScheme),
            values: {
                title: articleDetail?.title ?? "",
                author: articleDetail?.author ?? "",
                status: articleDetail?.status ?? "",
                categoryId: articleDetail?.categoryId ?? "",
                timeToRead: articleDetail?.timeToRead ?? 0,
                content: articleDetail?.content ?? "",
                picture: articleDetail?.picture?.uri ?? ""
            }
        })
    const { data: category } = useCategoryDropDownQuery()

    const onSubmit = async (data: articleRequest) => {
        try {
            const submitData = { ...data, type: "article" }
            if (isEdit && type === "edit") {
                if (!articleDetail) return
                useEditArticle.mutate(
                    { data: submitData, id: articleDetail.id },
                    {
                        onSuccess: () => {
                            reset(data)
                            setOpen(false)
                        }
                    }
                )
            } else {
                useCreateArticle.mutate(submitData, {
                    onSuccess: () => {
                        reset()
                        setOpen(false)
                    },
                    onError: (error: any) => {
                        const message = error.response.data.message
                        if (message.toLowerCase().includes("picture")) {
                            setError("picture", {
                                type: "server",
                                message
                            })
                            return
                        }
                    }
                })
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    };

    const categoryOptions =
        category?.map((item) => ({
            value: item.id,
            label: item.name,
        })) ?? [];

    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
                <p className="text-xl">{isEdit ? "Edit Article" : "Create Article"}</p>
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => {
                        setOpen(!open)
                        reset()
                    }
                    }><Icons.Close />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-auto">
                <div className="py-2 px-2 h-6/9 flex-1 overflow-auto">
                    <InputField
                        label="Title"
                        variant="form"
                        inputSize="lg"
                        placeholder="Title"
                        {...register("title")}
                        error={errors.title?.message}>
                    </InputField>
                    <InputField
                        label="Author"
                        variant="form"
                        inputSize="lg"
                        placeholder="Author"
                        {...register("author")}
                        error={errors.author?.message}>
                    </InputField>
                    
                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <SelectForm
                                label="Status"
                                options={[
                                    { value: "published", label: "published" },
                                    { value: "unpublished", label: "unpublished" },
                                    { value: "draft", label: "draft" },
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

                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field }) => (
                            <SelectForm
                                label="Category"
                                options={categoryOptions}
                                value={
                                    categoryOptions.find(
                                        (option) => option.value === field.value
                                    ) ?? null
                                }
                                onChange={(option) => field.onChange(option?.value)}
                                error={errors.status?.message}
                            />
                        )}
                    />

                    <InputField
                        label="Duration (Ex: 3 mins) "
                        variant="form"
                        inputSize="lg"
                        type="number"
                        placeholder="Time To Read"
                        {...register("timeToRead")}
                        error={errors.timeToRead?.message}>
                    </InputField>
                    <Image
                        name="picture"
                        label="Image"
                        control={control}
                        error={errors.picture?.message}
                        defaultImage={isEdit ? articleDetail?.picture?.uri ?? selectedArticle?.picture?.uri ?? "" : ""}
                    />

                    <TextArea
                        label="Content"
                        placeholder="Write content here..."
                        {...register("content")}
                        error={errors.content?.message}
                    />
                </div>
                <div className="px-6 py-4 mt-auto border-t bg-white">
                    <Button>{isEdit ? "Update" : "Create"}</Button>
                </div>
            </form>
        </PopupCE>
    </>)
}