import { useModalStore } from "@/hooks/useModalStore"
import Header from "@/layouts/Header"
import Button from "@/components/common/form/baseForm/Button"
import PdFormModal from "./PdFormModal"
import PdDelete from "./PdDelete"

export default function PdModal() {
    const { setOpen, typeMode, setTypeMode } = useModalStore()

    const renderModal = () => {
        switch(typeMode){
            case "create":
                return <PdFormModal type={"create"} />
            case "edit":
                return <PdFormModal type={"edit"} />
            case "delete":
                return <PdDelete />
            default:
                return null
        }
    }

    return (<>
        <Header href="/admin/pd-sessions" childrenHref="Pd Session" children={
            <>
                <Button
                    variant="create"
                    size="sm"
                    className="mr-8"
                    onClick={() => {
                        setTypeMode("create")
                        setOpen(true)}}>
                    Create
                </Button>     
            </>
        } 
        />
        {renderModal()}
    </>)
}