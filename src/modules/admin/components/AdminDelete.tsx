import type { Admin } from "../types/Admin"
import { Icons } from "@/components/common/Icon"
import { DeleteAdmin } from "../api/api"
import { toast } from "react-toastify"
import Button from "@/components/common/form/Button"
import { useRefetchData } from "@/hooks/useRefetch"

interface Props {
    open: boolean
    setOpen: (open : boolean) => void,
    admin: Admin,
}

export default function AdminDelete({ open, setOpen, admin }: Props) {
    const { refetch } = useRefetchData()
    const handleDelete = async () => {
        try {
            const response = await DeleteAdmin(admin.id)
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
        </>
    )
}