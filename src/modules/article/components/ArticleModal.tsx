import Button from "@/components/common/form/Button";
import PopupCE from "@/components/common/base/PopupCE";
import { useModalStore } from "@/hooks/useModalStore";
import Header from "@/layouts/Header";
import ArticleCreate from "./ArticleCreate";
import { useArticleStore } from "../store/useSeletedArticle";
import ArticleEdit from "./ArticleEdit";
import PopupConfirm from "@/components/common/base/PopupComfirm";
import ArticleDelete from "./ArticleDelete";
import { useStore } from "@/hooks/useStore";


export default function ArticleModal() {
    const { open, setOpen, openEdit, setOpenEdit, confirm, setConfirm } = useModalStore()
    const { selectedArticle } = useArticleStore()
    const { search, setSearch } = useStore();
    return (<>
        <Header href="/admin/article" childrenHref="Article" children={
            <>
                <Button
                    variant="create"
                    size="sm"
                    className="mr-8"
                    onClick={() => setOpen(true)}>
                    Create
                </Button>

                <PopupCE open={open} onOpenChange={setOpen}>
                    {<ArticleCreate
                        open={open}
                        setOpen={setOpen}
                    />}
                </PopupCE>
            </>
        } 
            searchValue={search} onSearchChange={setSearch}
        />

        <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
            {selectedArticle && (
                <ArticleEdit
                    open={openEdit}
                    setOpen={setOpenEdit}
                    article={selectedArticle}
                />
            )}
        </PopupCE>
        <PopupConfirm open={confirm} onOpenChange={setConfirm}>
            {selectedArticle && (
                <ArticleDelete
                    open={confirm}
                    setOpen={setConfirm}
                    article={selectedArticle} />
            )}
        </PopupConfirm>
    </>)
}