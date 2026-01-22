import { useModalStore } from "@/hooks/useModalStore";
import Header from "@/layouts/Header";
import Button from "@/components/common/form/Button";
import VoucherFormModal from "./VoucherFormModal";
import VoucherEdit from "./VoucherEdit";

export default function VoucherModal() {
    const { setOpen, typeMode, setTypeMode } = useModalStore()

    const renderModal = () => {
        switch(typeMode){
            case "create" : 
                return <VoucherFormModal type={"create"} />
            case "edit" : 
                return <VoucherEdit />
            default:
                return null
        }
    }
    return (<>
        <Header href="/admin/voucher" childrenHref={"Voucher"}
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