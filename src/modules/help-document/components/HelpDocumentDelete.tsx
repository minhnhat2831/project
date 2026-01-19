import { toast } from "react-toastify"
import { icons } from "@/components/common/base/Icon"
import Button from "@/components/common/form/Button"
import { useDocumentStore } from "../store/useSelectedDocument"
import { useModalStore } from "@/hooks/useModalStore"
import PopupConfirm from "@/components/common/base/PopupConfirm"
import useHelpDocument from "../hooks/useHelpDocument"

export default function HelpDocumentDelete() {
    const { open, setOpen } = useModalStore()
    const { selectedDocument } = useDocumentStore()
    const { useDeleteHelpDocument } = useHelpDocument()
    const handleDelete = async () => {
        try {
            if (!selectedDocument) return
            useDeleteHelpDocument.mutate({ id: selectedDocument.id }, {
                onSuccess: () => {
                    setOpen(false)
                }
            })
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }
    return (
        <>
            <PopupConfirm open={open} onOpenChange={setOpen}>
                <div className="px-8 mt-5">
                    <icons.Error className="text-red-500" fontSize="large" />
                </div>
                <div className="px-8">
                    <h1 className="text-2xl font-bold">Delete Help Document?</h1>
                    <p className="leading-8">Are you sure you want to delete this items?</p>
                </div>
                <div className="flex px-8 h-8 mt-6">
                    <Button
                        type="button"
                        variant="cancel"
                        onClick={() => setOpen(!open)}>
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="delete"
                        onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </PopupConfirm>
        </>
    )
}