import { useModalStore } from "@/hooks/useModalStore"
import { useStore } from "@/hooks/useStore"
import { useDocumentStore } from "../store/useSeletedDocument"
import Header from "@/layouts/Header"
import Button from "@/components/common/form/Button"
import PopupCE from "@/components/common/PopupCE"
import HelpDocumentCreate from "./HelpDocumentCreate"
import HelpDocumentEdit from "./HelpDocumentEdit"
import PopupConfirm from "@/components/common/PopupComfirm"
import HelpDocumentDelete from "./HelpDocumentDelete"

export default function HelpDocumentModal() {
    const { open, setOpen, openEdit, setOpenEdit, confirm, setConfirm } = useModalStore()
    const { search, setSearch } = useStore()
    const { selectedDocument } = useDocumentStore()

    return (
        <>
            <Header href="/admin/help-documents" childrenHref="Help Document"
                children={<>
                    <Button
                        variant="create"
                        size="lg"
                        className="mr-4"
                        onClick={() => setOpen(!open)}
                    >
                        Create
                    </Button>
                    <PopupCE open={open} onOpenChange={setOpen}>
                        <HelpDocumentCreate 
                            open={open} 
                            setOpen={setOpen} />
                    </PopupCE>
                </>} 
                searchValue={search} onSearchChange={setSearch}
                />

            <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
                {selectedDocument && 
                    <HelpDocumentEdit 
                        open={openEdit} 
                        setOpen={setOpenEdit}
                        document={selectedDocument} />
                }
            </PopupCE>

            <PopupConfirm open={confirm} onOpenChange={setConfirm}>
                {selectedDocument && 
                <HelpDocumentDelete 
                    open={confirm} 
                    setOpen={setConfirm} 
                    document={selectedDocument}/>}
                
            </PopupConfirm>
        </>)
}