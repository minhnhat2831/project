import InputField from "@/components/common/form/Input"
import type { Article } from "../types/article/Article"
import Button from "@/components/common/form/Button"
import Select from "@/components/common/form/Select"
import { useForm } from "react-hook-form"
import type { ArticleEditRequest } from "../types/article/ArticleEdit"
import { EditArticle } from "../api/api"
import { toast } from "react-toastify"
import { useRefetchData } from "@/hooks/useRefetch"
import { useCategoryData } from "@/hooks/useCategoryData"
import { Icons } from "@/components/common/Icon"
import Image from "@/components/common/form/Image"
import TextArea from "@/components/common/form/TextArea"
import useArticleId from "../hooks/useArticleId"

interface props {
    open: boolean
    setOpen: (open: boolean) => void,
    article: Article,
}

export default function ArticleEdit({ open, setOpen, article }: props) {
    const { data : articleId } = useArticleId(article.id)
    const { register, handleSubmit, control, formState: { errors } } =
        useForm<ArticleEditRequest>({
            values: articleId
                ? {
                title : articleId?.title ?? "",
                author : articleId?.author ?? "",
                status : articleId?.status ?? "",
                categoryId : articleId?.categoryId ?? "",
                timeToRead : articleId?.timeToRead ?? 0,
                picture : articleId?.picture ?? "",
                content : articleId?.content ?? "",
                type : "article"
            }
                : undefined
        })
    const { refetch } = useRefetchData()
    const { data: category } = useCategoryData()

    const onSubmit = async (data: ArticleEditRequest) => {
        try {
            const response = await EditArticle(article.id, data);
            toast.success(response?.message)
            refetch?.()
            setOpen(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    };
    return (<>
        <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
            <p className="text-xl">Edit Article</p>
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
                <Button>Update</Button>
            </div>
        </form>
    </>)
}