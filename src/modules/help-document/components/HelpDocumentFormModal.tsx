import PopupCE from "@/components/common/base/PopupCE"
import { useModalStore } from "@/hooks/useModalStore"
import { useDocumentStore } from "../store/useSeletedDocument"
import useHelpDocumentDetail from "../hooks/useHelpDocumentDetail"
import { zodResolver } from "@hookform/resolvers/zod"
import { HelpDocumentSchema, type HelpDocumentForm } from "../util/HelpDocumentSchema"
import { useForm } from "react-hook-form"
import { useRefetchData } from "@/hooks/useRefetch"
import { toast } from "react-toastify"
import { CreateHelpDocument, EditHelpDocument } from "../api/api"
import Button from "@/components/common/form/Button"
import { Icons } from "@/components/common/base/Icon"
import InputField from "@/components/common/form/Input"
import SelectForm from "@/components/common/form/Select"
import TextArea from "@/components/common/form/TextArea"
import { useEffect } from "react"

interface props {
    type: "create" | "edit"
}

export default function HelpDocumentFormModal({ type }: props) {
    const { open, setOpen, typeMode } = useModalStore()
    const isEdit = typeMode === "edit"
    const { selectedDocument } = useDocumentStore()
    const { data: helpDocumentDetail } = useHelpDocumentDetail(isEdit ? selectedDocument?.id : "")
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<HelpDocumentForm>({
        resolver: zodResolver(HelpDocumentSchema),
        defaultValues: helpDocumentDetail ? {
            title: helpDocumentDetail?.title,
            content: helpDocumentDetail?.content,
            status: helpDocumentDetail?.status,
        } : {
            title: "",
            content: "",
            status: ""
        }
    })

    useEffect(() => {
        if (type === "edit" && helpDocumentDetail) {
            reset({
                title: helpDocumentDetail?.title,
                content: helpDocumentDetail?.content,
                status: helpDocumentDetail?.status,
            })
        }
        if (type === "create") {
            reset({
                title: "",
                content: "",
                status: ""
            })
        }
    }, [type, reset, helpDocumentDetail])

    const { refetch } = useRefetchData()

    const onSubmit = async (data: HelpDocumentForm) => {
        try {
            if (isEdit) {
                if (!helpDocumentDetail) return
                const response = await EditHelpDocument(helpDocumentDetail.id, data)
                toast.success(response?.message)
                reset(data)
            } else {
                const response = await CreateHelpDocument(data)
                toast.success(response?.message)
                reset()
            }
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
    }
    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
                <p className="text-xl">{isEdit ? "Edit Help Document" : "Create Help Document"}</p>
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

                    <SelectForm label="Status"
                        {...register("status")}
                        error={errors.status?.message}>
                        <option value="" hidden>Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </SelectForm>

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
                        variant="edit">
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </PopupCE>
    </>
    )
}