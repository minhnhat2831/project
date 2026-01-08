import Button from "@/components/common/form/Button"
import type { HelpDocument } from "../types/HelpDocument"
import TextArea from "@/components/common/form/TextArea"
import Select from "@/components/common/form/Select"
import InputField from "@/components/common/form/Input"
import { Icons } from "@/components/common/base/Icon"
import { toast } from "react-toastify"
import { EditHelpDocument } from "../api/api"
import { useRefetchData } from "@/hooks/useRefetch"
import { useForm } from "react-hook-form"
import useHelpDocumentId from "../hooks/useHelpDocumentId"
import { HelpDocumentSchema, type HelpDocumentForm } from "../util/HelpDocumentSchema"
import { zodResolver } from "@hookform/resolvers/zod"

interface props {
    open: boolean,
    setOpen: (open: boolean) => void,
    document: HelpDocument
}

export default function HelpDocumentEdit({ open, setOpen, document }: props) {
    const { data } = useHelpDocumentId(document.id)
    const { register, handleSubmit, setError, formState: { errors } } = useForm<HelpDocumentForm>({
        resolver : zodResolver(HelpDocumentSchema) as any,
        values: data ? {
            title: data?.title,
            content: data?.content,
            status: data?.status,
        } : undefined
    })

    const { refetch } = useRefetchData()

    const onSubmit = async (data: HelpDocumentForm) => {
        try {
            const helpDocumentData = { ...(data as any) }
            const response = await EditHelpDocument(document.id, helpDocumentData)
            toast.success(response?.message)
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
        <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
            <p className="text-xl">Edit Help Document</p>
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

                <Select label="Status"
                    {...register("status")}
                    error={errors.status?.message}>
                    <option value="" hidden>Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>

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