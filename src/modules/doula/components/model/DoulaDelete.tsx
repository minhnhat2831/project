import { Icons } from "@/components/common/Icon"
import type { Doula } from "../../types/admin-doula/AdminDoulaId"
import { DoulaRemove } from "../../api/api"
import { toast } from "react-toastify"

interface Props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    doula: Doula,
    onSuccess?: () => void,
}

export default function DoulaDelete({ open, setOpen, doula, onSuccess }: Props) {
    const handleDelete = async () => {
        try {
            const response = await DoulaRemove(doula.id)
            toast.success(response?.message)
            onSuccess?.()
            setOpen(false)
        } catch(error : any){
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
                <h1 className="text-2xl font-bold">Confirm Delete Admin?</h1>
                <p className="leading-8">Are you sure you want to delete this admin?</p>
            </div>
            <div className="flex px-8 h-8 mt-6">
                <button className="w-full border bg-white text-gray-500 font-black cursor-pointer rounded" onClick={() => setOpen(!open)}>Cancel</button>
                <button className="w-full border bg-red-500 text-black font-black cursor-pointer rounded" onClick={handleDelete}>Delete</button>
            </div>
        </>
    )
}