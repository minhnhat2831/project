import PopupCE from "@/components/common/PopupCE";
import DoulaEdit from "./DoulaEdit";
import DoulaDelete from "./DoulaDelete";
import PopupConfirm from "@/components/common/PopupComfirm";
import { useDoulaStore } from "../../store/useSeletedDoula";
import { useModalStore } from "@/hooks/useModalStore";

export default function DoulaModal() {
    const { confirm, openEdit, setOpenEdit, setConfirm} = useModalStore()
    const { selectedDoula } = useDoulaStore()
    
    return (<>
    
        <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
            {selectedDoula && (
                <DoulaEdit
                    open={openEdit}
                    setOpen={setOpenEdit}
                    doula={selectedDoula}
                />
            )}
        </PopupCE>
        <PopupConfirm open={confirm} onOpenChange={setConfirm}>
            {selectedDoula && (
                <DoulaDelete
                    open={confirm}
                    setOpen={setConfirm}
                    doula={selectedDoula}
                />
            )}
        </PopupConfirm>
    </>)
}