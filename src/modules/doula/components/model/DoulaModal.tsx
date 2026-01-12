import { useModalStore } from "@/hooks/useModalStore";
import DoulaFormModal from "./DoulaFormModal";
import DoulaDelete from "./DoulaDelete";

export default function DoulaModal() {
    const { typeMode } = useModalStore()
    
    const renderModal = () => {
        switch(typeMode){
            case "edit" :
                return <DoulaFormModal type={"edit"} />
            case "delete" : 
                return <DoulaDelete />
            default :
                return null
        }
    }
    return (<>
        {renderModal()}
    </>)
}