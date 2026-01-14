import { Icons } from "@/components/common/base/Icon"
import { DeleteAdmin } from "../api/api"
import { toast } from "react-toastify"
import Button from "@/components/common/form/Button"
import { useRefetchData } from "@/hooks/useRefetch"
import PopupConfirm from "@/components/common/base/PopupConfirm"
import { useModalStore } from "@/hooks/useModalStore"
import { useAdminStore } from "../store/useSeletedAdminStore"

export default function AdminDelete() {
    const { refetch } = useRefetchData()
    const { open, setOpen } = useModalStore()
    const { selectedAdmin } = useAdminStore()
    const handleDelete = async () => {
        try {
            if(!selectedAdmin) return
            const response = await DeleteAdmin(selectedAdmin.id)
            toast.success(response?.message)
            refetch?.()
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
                    <Icons.Error className="text-red-500" fontSize="large" />
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