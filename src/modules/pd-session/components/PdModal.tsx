import { useModalStore } from "@/hooks/useModalStore"
import { useSelectedPd } from "../store/useSeletedPd"
import Header from "@/layouts/Header"
import Button from "@/components/common/form/Button"
import PopupCE from "@/components/common/PopupCE"
import PopupConfirm from "@/components/common/PopupComfirm"
import PdCreate from "./PdCreate"
import PdEdit from "./PdEdit"
import PdDelete from "./PdDelete"
import { useStore } from "@/hooks/useStore"

export default function PdModal() {
    const { open, setOpen, openEdit, setOpenEdit, confirm, setConfirm } = useModalStore()
    const { selectedPd } = useSelectedPd()
    const { search, setSearch } = useStore();

    return (<>
        <Header href="/admin/pd-sessions" childrenHref="Pd Session" children={
            <>
                <Button
                    variant="create"
                    size="sm"
                    className="mr-8"
                    onClick={() => setOpen(true)}>
                    Create
                </Button>

                <PopupCE open={open} onOpenChange={setOpen}>
                    {<PdCreate
                        open={open}
                        setOpen={setOpen}
                    />}
                </PopupCE>
            </>
        } 
            searchValue={search} onSearchChange={setSearch}
        />

        <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
            {selectedPd && (
                <PdEdit
                    open={openEdit}
                    setOpen={setOpenEdit}
                    pdsession={selectedPd}
                />
            )}
        </PopupCE>
        <PopupConfirm open={confirm} onOpenChange={setConfirm}>
            {selectedPd && (
                <PdDelete
                    open={confirm}
                    setOpen={setConfirm}
                    pdsession={selectedPd} />
            )}
        </PopupConfirm>
    </>)
}