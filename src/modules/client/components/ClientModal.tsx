import { useModalStore } from "@/hooks/useModalStore";
import ClientFormModal from "./ClientFormModal";
import ClientDelete from "./ClientDelete";

export default function ClientModal() {
    const { typeMode } = useModalStore()

    const renderModal = () => {
        switch (typeMode) {
            case "edit":
                return <ClientFormModal type={"edit"} />
            case "delete":
                return <ClientDelete />
            default:
                return null
        }
    }
    return (<>
        {renderModal()}
    </>)
}