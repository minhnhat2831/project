import { Icons } from "@/components/common/base/Icon"
import { useOpenFormStore } from "@/modules/cashTransaction/store/useModalFormStore"
import { useDataStore } from "@/modules/cashTransaction/store/useDataStore"
import { TRANSACTION_CREDIT_ENUM, TRANSACTION_STATUS_ENUM } from "@/modules/cashTransaction/constants/TransactionType"

import { useList } from "@/modules/cashTransaction/hooks/useListData"
import CashTransactionViewListItem from "./CashTransactionViewListItem"
import CashTransactionViewTableItem from "./CashTransactionViewTable"

export default function CashTransactionViewDetail() {
    const { open, setOpen } = useOpenFormStore()
    const { selectedData } = useDataStore()
    const { useGetListDetail } = useList()
    const { data } = useGetListDetail(selectedData?.transactionId)

    const transactionData = data?.data?.cashOrderData

    const renderModal = () => {
        if (TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT === transactionData?.transactionType 
            && transactionData.orderStatus === TRANSACTION_STATUS_ENUM.PENDING_MAKER) {
            return <CashTransactionViewTableItem />
        } else if (transactionData?.transactionType) {
            return <CashTransactionViewListItem status={transactionData?.orderStatus} transactionType={transactionData?.transactionType} />
        }
    }

    return (<>
        <div className={`bg-white rounded-sm mb-5 transition-all duration-1000 ease-in-out shadow-xl
                    ${open ? "max-h-500" : "max-h-12"}`}>

            <div
                className="border-b h-12 px-4 flex items-center cursor-pointer "
                onClick={() => setOpen(!open)}
            >
                <p className="font-bold">Transaction Details</p>
                <div className="ml-auto transition-transform duration-500 ease-in-out">
                    {open ? <Icons.ExpandLess /> : <Icons.ExpandMore />}

                </div>
            </div>
            <div
                className={` px-4 overflow-hidden transition-all duration-800 ease-in-out 
                    ${open ? "max-h-500 pt-4" : "max-h-0 pt-0"}`}>

                {renderModal()}
            </div>
        </div>
    </>)
}