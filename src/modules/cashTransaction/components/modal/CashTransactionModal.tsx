import Header from "@/layouts/Header";
import PopupCreate from "../common/PopupCreate";
import { useModalStore } from "@/hooks/useModalStore";
import Button from "@/components/common/form/Button";
import CashTransactionFormModal from "./CashTransactionFormModal";
import { useModalCreateStore } from "../../store/useModalCreateStore";

export default function CashTransactionModal() {
    const { open, setOpen } = useModalStore()
    const { setOpen: setOpenModal, setTypeMode } = useModalCreateStore()

    const renderModal = () => {
        return <CashTransactionFormModal />;
    }

    return (<>
        <Header href="/admin/cash-transaction" childrenHref={"Cash Transaction"} hidden="hidden"
            children={
                <>
                    <Button
                        variant="create"
                        onClick={() => setOpen(true)}
                        className="mr-8 w-40 overflow-hidden"
                    >
                        Create Transaction
                    </Button>
                    <PopupCreate open={open} onOpenChange={setOpen}>
                        <Button
                            variant="normal"
                            className="text-left px-1 hover:bg-gray-200"
                            onClick={() => {
                                setTypeMode("Debit"),
                                setOpenModal(true)
                                setOpen(false)
                            }
                            }>
                            Debit
                        </Button>
                        <Button
                            variant="normal"
                            className="text-left px-1 hover:bg-gray-200"
                            onClick={() => {
                                setTypeMode("Credit")
                                setOpenModal(true)
                                setOpen(false)
                            }
                            }>
                            Credit
                        </Button>
                    </PopupCreate>
                </>
            }
        />
        {renderModal()}
    </>)
}