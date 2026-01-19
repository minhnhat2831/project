import { useModalStore } from "@/hooks/useModalStore"
import { usePdStore } from "../store/useSelectedPd"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import Button from "@/components/common/form/Button"
import { icons } from "@/components/common/base/Icon"
import InputField from "@/components/common/form/Input"
import SelectForm from "@/components/common/form/Select"
import Image from "@/components/common/form/Image"
import TextArea from "@/components/common/form/TextArea"
import PopupCE from "@/components/common/base/PopupCE"
import { useCategoryDropDownQuery } from "@/hooks/useCategoryDropDownQuery"
import usePdSession from "../hooks/usePdSession"
import type { pdRequest } from "../schema/PdSchema.type"
import { pdRequestScheme } from "../schema/PdSchema"

interface props {
    type: "create" | "edit"
}

export default function PdFormModal({ type }: props) {
    const { open, setOpen, typeMode } = useModalStore()
    const { selectedPd } = usePdStore()
    const isEdit = typeMode === "edit"
    const { useCreatePdSession, useEditPdSession, usePdSessionDetail} = usePdSession()
    const { data: pdsessionId } = usePdSessionDetail(isEdit ? selectedPd?.id : "")
    const { register, handleSubmit, reset, setError, control, formState: { errors } } =
        useForm<pdRequest>({
            resolver: zodResolver(pdRequestScheme),
            values:{
                    title: pdsessionId?.title ?? "",
                    author: pdsessionId?.author ?? "",
                    status: pdsessionId?.status ?? "",
                    categoryId: pdsessionId?.categoryId ?? "",
                    timeToRead: pdsessionId?.timeToRead ?? 0,
                    picture: pdsessionId?.picture?.uri ?? selectedPd?.picture?.uri ?? "",
                    content: pdsessionId?.content ?? "",
                }            
        })
    const { data: category } = useCategoryDropDownQuery()

    const onSubmit = async (data: pdRequest) => {
        try {
            const pddata = { ...(data), type: "pd" }
            if (isEdit && type === 'edit') {
                if (!pdsessionId) return
                useEditPdSession.mutate({ id: pdsessionId.id, data: pddata }, {
                    onSuccess: () => {
                        reset(pddata)
                        setOpen(false)
                    }
                })
            } else {
                useCreatePdSession.mutate(pddata, {
                    onSuccess: () => {
                        reset()
                        setOpen(false)
                    },
                    onError: (err: any) => {
                        const message = err.response.data.message
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
    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
                <p className="text-xl">{isEdit ? "Edit Pd-Session" : "Create Pd-Session"}</p>
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => {
                        setOpen(!open)
                        reset()
                    }}><icons.Close />
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