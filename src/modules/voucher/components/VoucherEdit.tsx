import { useRefetchData } from "@/hooks/useRefetch"
import type { Voucher } from "../types/Voucher"
import { EditVoucher } from "../api/api"
import { toast } from "react-toastify"
import { Icons } from "@/components/common/Icon"

interface prop {
    open: boolean,
    setOpen: (open: boolean) => void,
    voucher: Voucher
}

export default function VoucherEdit({ open, setOpen, voucher }: prop) {
    const { refetch } = useRefetchData()
    const handleInactive = async () => {
        try {
            const response = await EditVoucher(voucher.id, {
                status : "inactive"
            })
            toast.success(response?.message)
            refetch?.()
            setOpen(false)
        } catch (error: any) {
            console.log(error.response?.data?.message)
            toast.error(error.response?.data?.message)
        }
    }

    return (<>
        <div className="px-8 mt-5">
            <Icons.Error className="text-red-500" fontSize="large" />
        </div>
        <div className="px-8">
            <h1 className="text-2xl font-bold">Inactive voucher?</h1>
            <p className="leading-8">Are you sure you want to inactive this item?</p>
        </div>
        <div className="flex px-8 h-8 mt-6">
            <button className="w-full border bg-white text-gray-500 font-black cursor-pointer rounded" onClick={() => setOpen(!open)}>Cancel</button>
            <button className="w-full border bg-red-500 text-black font-black cursor-pointer rounded" onClick={handleInactive}>Inactive</button>
        </div>
    </>)
}