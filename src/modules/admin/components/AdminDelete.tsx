import { icons } from "@/components/common/base/Icon"
import { toast } from "react-toastify"
import Button from "@/components/common/form/Button"
import PopupConfirm from "@/components/common/base/PopupConfirm"
import { useModalStore } from "@/hooks/useModalStore"
import { useAdminStore } from "../store/useSeletedAdminStore"
import useAdmin from "../hooks/useAdmin"

export default function AdminDelete() {
    const { open, setOpen } = useModalStore()
    const { selectedAdmin } = useAdminStore()
    const { useDeleteAdmin } = useAdmin()
    
    const handleDelete = async () => {
        try {
            useDeleteAdmin?.mutate({ id: selectedAdmin?.id })
            setOpen(false)
        } catch (error: any) {
            const message = error.response?.data.message
            toast.error(message)
        }
    }

    return (
        <>
            <PopupConfirm open={open} onOpenChange={setOpen}>
                <div className="px-8 mt-5">
                    <icons.Error className="text-red-500" fontSize="large" />
                </div>
                <div className="px-8">
                    <h1 className="text-2xl font-bold">Confirm Delete Admin?</h1>
                    <p className="leading-8">Are you sure you want to delete this admin?</p>
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