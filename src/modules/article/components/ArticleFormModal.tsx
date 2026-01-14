import { Icons } from "@/components/common/base/Icon"
import Button from "@/components/common/form/Button"
import Image from "@/components/common/form/Image"
import InputField from "@/components/common/form/Input"
import TextArea from "@/components/common/form/TextArea"
import { useCategoryData } from "@/hooks/useCategoryData"
import { useRefetchData } from "@/hooks/useRefetch"
import { toast } from "react-toastify"
import { useArticleStore } from "../store/useSeletedArticle"
import useArticleDetail from "../hooks/useArticleDetail"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useModalStore } from "@/hooks/useModalStore"
import { CreateArticle, EditArticle } from "../api/api"
import SelectForm from "@/components/common/form/Select"
import PopupCE from "@/components/common/base/PopupCE"
import { useEffect } from "react"
import { ArticleRequestScheme, type ArticleRequest } from "../schema/ArticleScheme"
import { useStore } from "@/hooks/useStore"

interface props {
    type: "create" | "edit"
}

export default function ArticleFormModal({ type }: props) {
    const { resetData } = useStore()
    const { open, setOpen, typeMode } = useModalStore()
    const isEdit = typeMode === "edit"
    const { selectedArticle } = useArticleStore()
    const { data: articleDetail } = useArticleDetail(isEdit ? selectedArticle?.id : "")
    const { register, handleSubmit, control, reset, setError, formState: { errors } } =
        useForm<ArticleRequest>({
            resolver: zodResolver(
                type === "create" ? ArticleRequestScheme : ArticleRequestScheme
            ),
            defaultValues: isEdit
                ? {
                    title: articleDetail?.title ?? "",
                    author: articleDetail?.author ?? "",
                    status: articleDetail?.status ?? "",
                    categoryId: articleDetail?.categoryId ?? "",
                    timeToRead: articleDetail?.timeToRead ?? 0,
                    content: articleDetail?.content ?? "",
                    picture: articleDetail?.picture?.uri ?? ""
                }
                : {
                    title: "",
                    author: "",
                    status: "",
                    categoryId: "",
                    timeToRead: 0,
                    content: "",
                    picture: ""
                }
        })
    const { refetch } = useRefetchData()
    const { data: category } = useCategoryData()

    useEffect(() => {
        if (type === "edit" && articleDetail) {
            reset({
                title: articleDetail.title ?? "",
                author: articleDetail.author ?? "",
                status: articleDetail.status ?? "",
                categoryId: articleDetail.categoryId ?? "",
                timeToRead: articleDetail.timeToRead ?? 0,
                content: articleDetail.content ?? "",
                picture: articleDetail.picture?.uri ?? ""
            });
        }
        if (type === "create") {
            reset({
                title: "",
                author: "",
                status: "",
                categoryId: "",
                timeToRead: 0,
                content: "",
                picture: ""
            })
        }
    }, [articleDetail, type, reset]);


    const onSubmit = async (data: ArticleRequest) => {
        try {
            if (isEdit) {
                if (!articleDetail) return
                const submitData = { ...data, type: "article" };
                const response = await EditArticle(articleDetail.id, submitData,);
                reset(submitData);
                toast.success(response.message);
            } else {
                const submitData = { ...data, type: "article" };
                const response = await CreateArticle(submitData);
                reset();
                toast.success(response.message);
            }
            refetch?.()
            resetData()
            setOpen(false);
        } catch (error: any) {
            const message = error.response.data.message
            if (message.toLowerCase().includes("picture")) {
                setError("picture", {
                    type: "server",
                    message
                })
                return
            }
            toast.error(error.response?.data?.message)
        }
    };
    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
                <p className="text-xl">{isEdit ? "Edit Article" : "Create Article"}</p>
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
                    <SelectForm label="Status"
                        {...register("status")}
                        error={errors.status?.message}>
                        <option value="" hidden>Select Status</option>
                        <option value="published">Published</option>
                        <option value="unpublished">Unpublished</option>
                        <option value="draft">Draft</option>
                    </SelectForm>

                    <SelectForm label="Category"
                        {...register("categoryId")}
                        error={errors.categoryId?.message}>
                        {category.map((category, index) => (
                            <>
                                <option value="" hidden>Select Category</option>
                                <option key={index} value={category.id}>{category.name}</option>
                            </>
                        ))}
                    </SelectForm >

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
                        placeholder="Write article content..."
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