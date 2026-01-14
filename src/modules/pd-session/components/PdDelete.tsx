import { useRefetchData } from "@/hooks/useRefetch";
import { toast } from "react-toastify";
import { DeletePd } from "../api/api";
import { Icons } from "@/components/common/base/Icon";
import Button from "@/components/common/form/Button";
import { usePdStore } from "../store/useSelectedPd";
import { useModalStore } from "@/hooks/useModalStore";
import PopupConfirm from "@/components/common/base/PopupConfirm";

export default function PdDelete() {
    const { refetch } = useRefetchData()
    const { selectedPd } = usePdStore()
    const { open, setOpen } = useModalStore()
    const handleDelete = async () => {
        try {
            if (!selectedPd) return
            const response = await DeletePd({
                ids: [selectedPd.id]
            })
            toast.success(response?.message)
            refetch?.()
            setOpen(false)
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    return (<>
        <PopupConfirm open={open} onOpenChange={setOpen}>
            <div className="px-8 mt-5">
                <Icons.Error className="text-red-500" fontSize="large" />
            </div>
            <div className="px-8">
                <h1 className="text-2xl font-bold">Confirm Delete Pd-Session?</h1>
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
    </>)
}