import Button from "@/components/common/form/Button";
import { useModalStore } from "@/hooks/useModalStore";
import Header from "@/layouts/Header";
import ArticleFormModal from "./ArticleFormModal";
import ArticleDelete from "./ArticleDelete";

export default function ArticleModal() {
    const { setOpen, setTypeMode, typeMode } = useModalStore()

    const renderModal = () => {
        switch (typeMode) {
            case "create":
                return <ArticleFormModal type={"create"} />
            case "edit":
                return <ArticleFormModal type={"edit"} />
            case "delete":
                return <ArticleDelete />
            default:
                return null
        }
    }
    return (<>
        <Header href="/admin/article" childrenHref="Article" children={
            <>
                <Button
                    variant="create"
                    size="sm"
                    className="mr-8"
                    onClick={() => {
                        setTypeMode("create")
                        setOpen(true)
                    }}>
                    Create
                </Button>
            </>
        }
        />
        {renderModal()}
    </>)
}