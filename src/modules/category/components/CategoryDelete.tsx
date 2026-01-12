import { Icons } from "@/components/common/base/Icon"
import { toast } from "react-toastify"
import { useRefetchData } from "@/hooks/useRefetch"
import { DeleteCategory } from "../api/api"
import Button from "@/components/common/form/Button"
import { useCategoryStore } from "../store/useSelectedCategory"
import { useModalStore } from "@/hooks/useModalStore"
import PopupConfirm from "@/components/common/base/PopupComfirm"

export default function CategoryDelete() {
    const { refetch } = useRefetchData()
    const { open, setOpen } = useModalStore()
    const { selectedCategory } = useCategoryStore()
    const handleDelete = async () => {
        try {
            if (!selectedCategory) return
            const response = await DeleteCategory({
                ids: [selectedCategory?.id]
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
        <PopupConfirm open={open} onOpenChange={setOpen}>
            <div className="px-8 mt-5">
                <Icons.Error className="text-red-500" fontSize="large" />
            </div>
            <div className="px-8">
                <h1 className="text-2xl font-bold">Confirm Delete Category?</h1>
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