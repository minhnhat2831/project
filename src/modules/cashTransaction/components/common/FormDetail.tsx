import PopupForm from "../common/PopupForm";
import Button from "@/components/common/form/baseForm/Button";
import { Icons } from "@/components/common/base/Icon";
import { useModalConfirmStore } from "../../store/useModalConfirmStore";
import { useModalTypeStore } from "../../store/useModalTypeStore";
import CashTransactionViewDetail from "../modal/cashTransactionView/CashTransactionViewDetail";
import CashTransactionViewDocument from "../modal/cashTransactionView/CashTransactionViewDocument";
import CashTransactionViewInternal from "../modal/cashTransactionView/CashTransactionVIewInternal";
import { useDataStore } from "../../store/useDataStore";
import { useList } from "../../hooks/useListData";
import { TRANSACTION_STATUS_ENUM } from "../../constants/TransactionType";
import { toast } from "react-toastify";

export default function FormDetail() {
    const { open, setOpen, typeOpen } = useModalTypeStore()
    const { setType } = useModalConfirmStore()
    const { selectedData } = useDataStore()
    const { useGetListDetail } = useList()
    const { data } = useGetListDetail(selectedData?.transactionId)

    const transactionData = data?.data?.cashOrderData

    return (<>
        <PopupForm open={open} onOpenChange={setOpen}>
            <>
                <div className="w-full h-1/12 px-4 pt-2 flex justify-between items-center">
                    <h2 className="text-xl font-medium">View Transaction - {typeOpen}</h2>
                    <Button variant="close" onClick={() => {
                        setType("form")
                        setOpen(false)
                    }
                    }><Icons.Close /></Button>
                </div>

                <form className="flex flex-col h-full overflow-auto">
                    <div className="py-6 px-2 h-6/9 flex-1 overflow-auto bg-gray-100">
                        {/* Detail */}
                        <CashTransactionViewDetail />
                        <CashTransactionViewDocument />
                        <CashTransactionViewInternal />
                    </div>

                    <div className="flex justify-end px-6 rounded-b-xl py-4 mt-auto border-t bg-white">
                        <Button
                            type="button"
                            variant="normal"
                            size="sm"
                            className="w-30 mr-1 border hover:bg-gray-200 overflow-hidden"
                            onClick={() => {
                                setOpen(false)
                            }}>
                            Close
                        </Button>
                        {(transactionData?.orderStatus === TRANSACTION_STATUS_ENUM.DRAFT || transactionData?.orderStatus === TRANSACTION_STATUS_ENUM.PENDING_MAKER) &&
                            <>
                                <Button
                                    type="button"
                                    variant="disable"
                                    size="sm"
                                    className="w-40 mr-1 border text-red-500 bg-gray-200 overflow-hidden"
                                    onClick={() => setType("confirm")}>
                                    Save and Close
                                </Button>
                                <Button
                                    type="button"
                                    variant="normal"
                                    size="sm"
                                    className="w-40 bg-red-500 text-white hover:bg-blue-400 overflow-hidden"
                                    onClick={() => {
                                        setOpen(false)
                                        toast.success("Success")
                                    }}>
                                    Save and Submit
                                </Button>
                            </>}
                    </div>
                </form>
            </>
        </PopupForm >
    </>)
}