import Header from "@/layouts/Header";
import PopupCreate from "../common/PopupCreate";
import { useModalStore } from "@/hooks/useModalStore";
import Button from "@/components/common/form/baseForm/Button";
import CashTransactionFormModal from "./CashTransactionFormModal";
import { useModalCreateStore } from "../../store/useModalCreateStore";
import { TRANSACTION_TYPE_ENUM, TRANSACTION_TYPE_KEY } from "../../constants/TransactionType";
import FormDetail from "../common/FormDetail";
import { useModalTypeStore } from "../../store/useModalTypeStore";

export default function CashTransactionModal() {
    const { open, setOpen } = useModalStore()
    const { setOpen: setOpenModal, setTypeMode } = useModalCreateStore()
    const { typeOpen, setTypeOpen } = useModalTypeStore()

    const renderModal = () => {
        switch (typeOpen) {
            case "Create":
                return <CashTransactionFormModal />;
            case "View":
                return <FormDetail />
            default:
                return null
        }
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
                                setTypeOpen("Create")
                                setOpenModal(true)
                                setOpen(false)
                            }
                            }>
                            {TRANSACTION_TYPE_KEY[TRANSACTION_TYPE_ENUM.DEBIT]}
                        </Button>
                        <Button
                            variant="normal"
                            className="text-left px-1 hover:bg-gray-200"
                            onClick={() => {
                                setTypeMode("Credit")
                                setTypeOpen("Create")
                                setOpenModal(true)
                                setOpen(false)
                            }
                            }>
                            {TRANSACTION_TYPE_KEY[TRANSACTION_TYPE_ENUM.CREDIT]}
                        </Button>
                    </PopupCreate>
                </>
            }
        />
        {renderModal()}
    </>)
}