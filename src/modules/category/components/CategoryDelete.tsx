import { Icons } from "@/components/common/base/Icon"
import type { Category } from "../types/Category"
import { toast } from "react-toastify"
import { useRefetchData } from "@/hooks/useRefetch"
import { DeleteCategory } from "../api/api"

interface props {
    open: boolean,
    setOpen: (open: boolean) => void,
    category: Category
}

export default function CategoryDelete({ open, setOpen, category }: props) {
    const { refetch } = useRefetchData()

    const handleDelete = async () => {
        try {
            const response = await DeleteCategory({
                ids: [category.id]
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
            <h1 className="text-2xl font-bold">Confirm Delete Category?</h1>
            <p className="leading-8">Are you sure you want to delete this items?</p>
        </div>
        <div className="flex px-8 h-8 mt-6">
            <button className="w-full border bg-white text-gray-500 font-black cursor-pointer rounded" onClick={() => setOpen(!open)}>Cancel</button>
            <button className="w-full border bg-red-500 text-black font-black cursor-pointer rounded" onClick={handleDelete}>Delete</button>
        </div>
    </>)
}