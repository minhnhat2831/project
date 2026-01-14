import { Icons } from "@/components/common/base/Icon"
import { DoulaRemove } from "../../api/api"
import { toast } from "react-toastify"
import { useRefetchData } from "@/hooks/useRefetch"
import Button from "@/components/common/form/Button"
import { useDoulaStore } from "../../store/useSelectedDoula"
import { useModalStore } from "@/hooks/useModalStore"
import PopupConfirm from "@/components/common/base/PopupConfirm"

export default function DoulaDelete() {
    const { refetch } = useRefetchData()
    const { selectedDoula } = useDoulaStore()
    const { open, setOpen } = useModalStore()
    const handleDelete = async () => {
        try {
            if (!selectedDoula) return
            const response = await DoulaRemove(selectedDoula?.id)
            toast.success(response?.message)
            refetch?.()
            setOpen(false)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }

    }
    return (
        <>
            <PopupConfirm open={open} onOpenChange={setOpen}>
                <div className="px-8 mt-5">
                    <Icons.Error className="text-red-500" fontSize="large" />
                </div>
                <div className="px-8">
                    <h1 className="text-2xl font-bold">Confirm Delete Doula?</h1>
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