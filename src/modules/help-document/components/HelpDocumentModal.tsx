import { useModalStore } from "@/hooks/useModalStore"
import Header from "@/layouts/Header"
import Button from "@/components/common/form/baseForm/Button"
import HelpDocumentFormModal from "./HelpDocumentFormModal"
import HelpDocumentDelete from "./HelpDocumentDelete"

export default function HelpDocumentModal() {
    const { setOpen, typeMode, setTypeMode } = useModalStore()

    const renderModal = () => {
        switch (typeMode) {
            case "create":
                return <HelpDocumentFormModal type={"create"} />
            case "edit":
                return <HelpDocumentFormModal type={"edit"} />
            case "delete":
                return <HelpDocumentDelete />
            default:
                return null
        }
    }

    return (
        <>
            <Header href="/admin/help-documents" childrenHref="Help Document"
                children={<>
                    <Button
                        type="button"
                        variant="create"
                        size="sm"
                        className="mr-8"
                        onClick={() => {
                            setTypeMode("create")
                            setOpen(true)
                        }}
                    >
                        Create
                    </Button>
                </>}
            />
            {renderModal()}
        </>)
}