import { useRefetchData } from "@/hooks/useRefetch"
import type { HelpDocument } from "../types/HelpDocument"
import { DeleteHelpDocument } from "../api/api"
import { toast } from "react-toastify"
import { Icons } from "@/components/common/base/Icon"
import Button from "@/components/common/form/Button"

interface props {
    open: boolean,
    setOpen: (open: boolean) => void,
    document: HelpDocument
}

export default function HelpDocumentDelete({ open, setOpen, document }: props) {
    const { refetch } = useRefetchData()
    const handleDelete = async () => {
        try {
            const response = await DeleteHelpDocument(document.id)
            toast.success(response?.message)
            refetch?.()
            setOpen(false)
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message)
        }

    }
    return (
        <>
            <div className="px-8 mt-5">
                <Icons.Error className="text-red-500" fontSize="large" />
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
        </>
    )
}