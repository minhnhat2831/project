import { useModalStore } from "@/hooks/useModalStore"
import usePdDetail from "../hooks/usePdDetail"
import { usedPdStore } from "../store/useSeletedPd"
import { useForm } from "react-hook-form"
import { PdScheme, type PdForm } from "../util/PdSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRefetchData } from "@/hooks/useRefetch"
import { useCategoryData } from "@/hooks/useCategoryData"
import { toast } from "react-toastify"
import { Createpd, EditPd } from "../api/api"
import Button from "@/components/common/form/Button"
import { Icons } from "@/components/common/base/Icon"
import InputField from "@/components/common/form/Input"
import SelectForm from "@/components/common/form/Select"
import Image from "@/components/common/form/Image"
import TextArea from "@/components/common/form/TextArea"
import PopupCE from "@/components/common/base/PopupCE"
import { useEffect } from "react"

interface props {
    type: "create" | "edit"
}

export default function PdFormModal({ type }: props) {
    const { open, setOpen, typeMode } = useModalStore()
    const { selectedPd } = usedPdStore()
    const isEdit = typeMode === "edit"
    const { data: pdsessionId } = usePdDetail(isEdit ? selectedPd?.id : "")
    const { register, handleSubmit, reset, control, formState: { errors } } =
        useForm<PdForm>({
            resolver: zodResolver(PdScheme),
            defaultValues: pdsessionId
                ? {
                    title: pdsessionId?.title ?? "",
                    author: pdsessionId?.author ?? "",
                    status: pdsessionId?.status ?? "",
                    categoryId: pdsessionId?.categoryId ?? "",
                    timeToRead: pdsessionId?.timeToRead ?? 0,
                    picture: pdsessionId?.picture?.uri ?? selectedPd?.picture?.uri ?? "",
                    content: pdsessionId?.content ?? "",
                }
                : {
                    title: "",
                    author: "",
                    status: "",
                    categoryId: "",
                    timeToRead: 0,
                    picture: "",
                    content: ""
                }
        })
    const { refetch } = useRefetchData()
    const { data: category } = useCategoryData()

    useEffect(() => {
        if (type === "create") {
            reset({
                title: "",
                author: "",
                status: "",
                categoryId: "",
                timeToRead: 0,
                picture: "",
                content: ""
            })
        }
        if (type === "edit" && pdsessionId) {
            reset({
                title: pdsessionId?.title ?? "",
                author: pdsessionId?.author ?? "",
                status: pdsessionId?.status ?? "",
                categoryId: pdsessionId?.categoryId ?? "",
                timeToRead: pdsessionId?.timeToRead ?? 0,
                picture: pdsessionId?.picture?.uri ?? selectedPd?.picture?.uri ?? "",
                content: pdsessionId?.content ?? "",
            })
        }
    }, [reset, type, pdsessionId])

    const onSubmit = async (data: PdForm) => {
        try {
            if (isEdit) {
                if (!pdsessionId) return
                const pddata = { ...(data), type: "pd" }
                const response = await EditPd(pdsessionId.id, pddata);
                toast.success(response?.message)
                reset(pddata)
            } else {
                const pddata = { ...(data), type: "pd" }
                const response = await Createpd(pddata);
                toast.success(response?.message)
                reset()
            }
            refetch?.()
            setOpen(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    };
    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
                <p className="text-xl">{isEdit ? "Edit Pd-Session" : "Create Pd-Session"}</p>
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
                                <option value="" hidden>Select category</option>
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
                        defaultImage={isEdit ? pdsessionId?.picture?.uri ?? selectedPd?.picture?.id ?? "" : ""}
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