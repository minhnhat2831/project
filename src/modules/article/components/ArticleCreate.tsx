import Button from "@/components/common/form/Button";
import InputField from "@/components/common/form/Input";
import { Icons } from "@/components/common/base/Icon";
import { useForm } from "react-hook-form";
import Select from "@/components/common/form/Select";
import Image from "@/components/common/form/Image";
import TextArea from "@/components/common/form/TextArea";
import { useCategoryData } from "../../../hooks/useCategoryData";
import { CreateArticle } from "../api/api";
import { toast } from "react-toastify";
import { useRefetchData } from "@/hooks/useRefetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArticleScheme, type ArticleForm } from "../util/ArticleScheme";

interface prop {
    open: boolean,
    setOpen: (open: boolean) => void,
}

export default function ArticleCreate({ open, setOpen }: prop) {
    const { register, handleSubmit, control, formState: { errors } } = useForm<ArticleForm>({
        resolver : zodResolver(ArticleScheme) as any
    })
    const { data: category } = useCategoryData()
    const { refetch } = useRefetchData()

    const onSubmit = async (data: ArticleForm) => {
        try {
            const submitData = { ...(data as any), type: "article" };
            const response = await CreateArticle(submitData)
            toast.success(response?.message)
            refetch?.()
            setOpen(false)
        } catch (err: any) {
            toast.error("Create Article fail")
        }
    }
    return (<>
        <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
            <p className="text-xl">Create Article</p>
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
                <Select label="Status"
                    {...register("status")}
                    error={errors.status?.message}>
                    <option value="" hidden>Select Status</option>
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                    <option value="draft">Draft</option>
                </Select>

                <Select label="Category"
                    {...register("categoryId")}
                    error={errors.categoryId?.message}>
                    {category.map((category, index) => (
                        <>
                            <option value="" hidden>Select category</option>
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
                    {...register("timeToRead")}
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
                    {...register("content")}
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