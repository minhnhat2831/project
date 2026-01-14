import { useRefetchData } from "@/hooks/useRefetch"
import { EditVoucher } from "../api/api"
import { toast } from "react-toastify"
import { Icons } from "@/components/common/base/Icon"
import Button from "@/components/common/form/Button"
import { useVoucherStore } from "../store/useSelectedVoucher"
import { useModalStore } from "@/hooks/useModalStore"
import PopupConfirm from "@/components/common/base/PopupConfirm"

export default function VoucherEdit() {
    const { refetch } = useRefetchData()
    const { open, setOpen } = useModalStore()
    const { selectedVoucher } = useVoucherStore()
    const handleInactive = async () => {
        try {
            if (!selectedVoucher) return
            const response = await EditVoucher(selectedVoucher.id, {
                status: "inactive"
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
                <h1 className="text-2xl font-bold">Inactive voucher?</h1>
                <p className="leading-8">Are you sure you want to inactive this item?</p>
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
                    onClick={handleInactive}>
                    Delete
                </Button>
            </div>
        </PopupConfirm>
    </>)
}