import { Icons } from "@/components/common/base/Icon"
import { useRefetchData } from "@/hooks/useRefetch"
import { DeleteArticle } from "../api/api"
import { toast } from "react-toastify"
import type { ArticleDelete } from "../types/article/ArticleDelete"
import Button from "@/components/common/form/Button"
import { useArticleStore } from "../store/useSeletedArticle"
import PopupConfirm from "@/components/common/base/PopupComfirm"
import { useModalStore } from "@/hooks/useModalStore"

export default function ArticleDelete() {
    const { refetch } = useRefetchData()
    const { selectedArticle } = useArticleStore()
    const { open, setOpen } = useModalStore()
    const handleDelete = async () => {
        try {
            if (!selectedArticle) return
            const response = await DeleteArticle({
                ids: [selectedArticle.id]
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
                <h1 className="text-2xl font-bold">Confirm Delete Article?</h1>
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