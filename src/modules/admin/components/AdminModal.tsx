import Button from "@/components/common/form/Button";
import PopupCE from "@/components/common/PopupCE";
import Header from "@/layouts/Header";
import AdminCreatePopup from "./AdminCreate";
import AdminEditPopup from "./AdminEdit";
import PopupConfirm from "@/components/common/PopupComfirm";
import AdminDelete from "./AdminDelete";
import { useModalStore } from "@/hooks/useModalStore";
import { useStore } from "@/hooks/useStore";
import { useAdminStore } from "../store/useSeletedAdminStore";

export default function AdminModal() {
    const { open, setOpen, confirm, setConfirm, openEdit, setOpenEdit } = useModalStore()
    const { selectedAdmin } = useAdminStore()
    const { search, setSearch } = useStore()

    return (<>
        <Header href="/admin" childrenHref="Admin / Admin Manager"
            children={
                <>
                    <Button
                        type="button"
                        variant="create"
                        size="sm"
                        className="mr-4"
                        onClick={() => setOpen(true)}
                    >
                        Create
                    </Button>

                    <PopupCE open={open} onOpenChange={setOpen}>
                        <AdminCreatePopup
                            open={open}
                            setOpen={setOpen}
                        />
                    </PopupCE>
                </>
            }
            searchValue={search} onSearchChange={setSearch}
        />
        <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
            {selectedAdmin && (
                <AdminEditPopup
                    open={openEdit}
                    setOpen={setOpenEdit}
                    admin={selectedAdmin}
                />
            )}
        </PopupCE>
        <PopupConfirm open={confirm} onOpenChange={setConfirm}>
            {selectedAdmin && (
                <AdminDelete
                    open={confirm}
                    setOpen={setConfirm}
                    admin={selectedAdmin}
                />
            )}
        </PopupConfirm>
    </>)
}