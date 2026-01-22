import PopupCE from "@/components/common/base/PopupCE"
import { useModalStore } from "@/hooks/useModalStore"
import { useDocumentStore } from "../store/useSelectedDocument"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Button from "@/components/common/form/Button"
import { Icons } from "@/components/common/base/Icon"
import InputField from "@/components/common/form/Input"
import SelectForm from "@/components/common/form/SelectForm"
import TextArea from "@/components/common/form/TextArea"
import useHelpDocument from "../hooks/useHelpDocument"
import { helpDocumentRequestSchema } from "../schema/HelpDocumentSchema"
import type { helpDocumentRequest } from "../schema/HelpDocumentSchema.type"

interface props {
    type: "create" | "edit"
}

export default function HelpDocumentFormModal({ type }: props) {
    const { open, setOpen, typeMode } = useModalStore()
    const isEdit = typeMode === "edit"
    const { selectedDocument } = useDocumentStore()
    const { useCreateHelpDocument, useEditHelpDocument, useHelpDocumentDetail } = useHelpDocument()
    const { data: helpDocumentDetail } = useHelpDocumentDetail(isEdit ? selectedDocument?.id : "")
    const { register, handleSubmit,control, reset, setError, formState: { errors } } = useForm<helpDocumentRequest>({
        resolver: zodResolver(helpDocumentRequestSchema),
        values: isEdit ? {
            title: helpDocumentDetail?.title ?? "",
            content: helpDocumentDetail?.content ?? "",
            status: helpDocumentDetail?.status ?? "",
        } : {
            title: "",
            content: "",
            status: ""
        }
    })

    const onSubmit = async (data: helpDocumentRequest) => {
        try {
            if (isEdit && type === "edit") {
                if (!helpDocumentDetail) return
                useEditHelpDocument.mutate({ id: helpDocumentDetail.id, data: data }, {
                    onSuccess: () => {
                        reset(data)
                        setOpen(false)
                    }
                })
            } else {
                useCreateHelpDocument.mutate(data, {
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
                        if (message.toLowerCase().includes("status")) {
                            setError("status", {
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
                })
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message)
        }
    }
    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
                <p className="text-xl">{isEdit ? "Edit Help Document" : "Create Help Document"}</p>
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
                        variant="form"
                        inputSize="lg"
                        placeholder="Title"
                        {...register("title")}
                        error={errors.title?.message}>
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

                    <TextArea
                        label="Content"
                        placeholder="Write content here..."
                        {...register("content")}
                        error={errors.content?.message}
                    />

                </div>
                <div className="px-6 py-4 mt-auto border-t bg-white">
                    <Button
                        type="submit"
                        variant="edit">
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </PopupCE>
    </>
    )
}