import { icons } from "@/components/common/base/Icon"
import { toast } from "react-toastify"
import Button from "@/components/common/form/Button"
import { useArticleStore } from "../store/useSelectedArticle"
import PopupConfirm from "@/components/common/base/PopupConfirm"
import { useModalStore } from "@/hooks/useModalStore"
import useArticle from "../hooks/useArticle"

export default function ArticleDelete() {
    const { selectedArticle } = useArticleStore()
    const { open, setOpen } = useModalStore()
    const { useDeleteArticle } = useArticle()
    const handleDelete = async () => {
        try {
            if (!selectedArticle) return
            useDeleteArticle.mutate({
                data: {
                    ids: [selectedArticle.id]
                }
            }, {
                onSuccess: () => {
                    setOpen(false)
                }
            })
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    return (<>
        <PopupConfirm open={open} onOpenChange={setOpen}>
            <div className="px-8 mt-5">
                <icons.Error className="text-red-500" fontSize="large" />
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