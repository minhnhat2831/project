import PopupCE from "@/components/common/base/PopupCE";
import { useModalStore } from "@/hooks/useModalStore";
import { useClientStore } from "../store/useSeletedClient";
import ClientEdit from "./ClientEdit";
import PopupConfirm from "@/components/common/base/PopupComfirm";
import ClientDelete from "./ClientDelete";

export default function ClientModal() {
    const { openEdit, setOpenEdit, confirm, setConfirm } = useModalStore()
    const { selectedClient } = useClientStore()
    return (<>
        <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
            {selectedClient && (
                <ClientEdit
                    open={openEdit}
                    setOpen={setOpenEdit}
                    client={selectedClient}
                />
            )}
        </PopupCE>
        <PopupConfirm open={confirm} onOpenChange={setConfirm}>
            {selectedClient && (
                <ClientDelete 
                    open={confirm}
                    setOpen={setConfirm}
                    client={selectedClient}
                    />
            )}
        </PopupConfirm>
    </>)
}