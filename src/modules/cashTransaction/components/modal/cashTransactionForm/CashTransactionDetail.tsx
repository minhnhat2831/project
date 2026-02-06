import { Icons } from "@/components/common/base/Icon"
import { useOpenFormStore } from "@/modules/cashTransaction/store/useModalFormStore"
import ConfirmField from "../../common/ConfirmField"
import { useDataStore } from "@/modules/cashTransaction/store/useDataStore"
import { TRANSACTION_STATUS_ENUM, TRANSACTION_TYPE_ENUM, TRANSACTION_TYPE_LABEL_MAP } from "@/modules/cashTransaction/constants/TransactionType"
import Button from "@/components/common/form/baseForm/Button"
import { useList } from "@/modules/cashTransaction/hooks/useListData"

export default function CashTransactionDetail() {
    const { open, setOpen } = useOpenFormStore()
    const { selectedData } = useDataStore()
    const { useGetListDetail } = useList()
    const { data } = useGetListDetail(selectedData?.transactionId)

    const formatTransactionType = (value?: string) => {
        if (!value) return '-'
        return TRANSACTION_TYPE_LABEL_MAP[value] ?? value
    }

    const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: selectedData?.currency ? selectedData?.currency : "VND" });

    const formatDate = (dateStr: string | number) => {
        const dateObj = new Date(dateStr);
        const formattedDate = dateObj.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(',', '');
        return formattedDate
    };

    const check = (value : string) => {
        if(value === TRANSACTION_STATUS_ENUM.DRAFT){
            return 'w-20 bg-blue-500 text-white'
        }else if(value === TRANSACTION_STATUS_ENUM.COMPLETE){
            return 'w-30 bg-green-500 text-white'
        }else if(value === TRANSACTION_STATUS_ENUM.PENDING){
            return 'w-25 bg-orange-500 text-white'
        }else if(value === TRANSACTION_STATUS_ENUM.PENDINGMAKER){
            return 'w-40 bg-red-500 text-white'
        }
    }

    return (<>
        <div className={`bg-white rounded-sm mb-5 transition-all duration-900 ease-in-out shadow-xl
                    ${open ? "h-auto" : "h-12"}`}>
            <div
                className="border-b h-12 px-4 flex items-center cursor-pointer "
                onClick={() => setOpen(!open)}
            >
                <p className="font-bold">Transaction Details</p>
                <div className="ml-auto transition-all duration-300 ease-in-out">
                    {open ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
                </div>
            </div>

            <div
                className={`px-5 py-3 transition-all duration-400 ease-in-out 
                    ${open ? "h-auto pt-4" : "h-0 pt-0 overflow-auto"}`}>

                {/*Data debit*/}       
                {selectedData?.transactionType === TRANSACTION_TYPE_ENUM.DEBIT && <>
                    <ConfirmField label='Transaction Type' text={formatTransactionType(data?.data?.cashOrderData.transactionType)} />
                    <ConfirmField label='Transaction Status' children={
                        <Button variant="normal" className={`${data?.data?.cashOrderData?.orderStatus ? check(data?.data?.cashOrderData?.orderStatus) : "-"}`}>{data?.data?.cashOrderData?.orderStatus}</Button>}
                    />

                    <ConfirmField label='Client Name' text={data?.data?.cashOrderData.orgName|| "-"} />
                    <ConfirmField label='Sub-Org Name' text={data?.data?.cashOrderData?.subOrgName || "-"} />
                    <ConfirmField label='Cash Transaction Id' text={data?.data?.cashOrderData?.transactionId || "-"} />

                    <ConfirmField label='Currency' text={data?.data?.cashOrderData?.currency || "-"} />
                    <ConfirmField label='Amount' text={data?.data?.cashOrderData?.totalCouponAmount ? formatter.format(Number(data?.data?.cashOrderData.totalCouponAmount)) : "-"} />
                    <ConfirmField label='Effective Date' text={formatDate(data?.data?.cashOrderData?.effectiveDo || "-")} />

                    <ConfirmField label='Fees' text={data?.data?.cashOrderData?.feesAmt ? formatter.format(data?.data?.cashOrderData?.feesAmt) : "-"} />
                    <ConfirmField label='GST' text={data?.data?.cashOrderData?.gstAmt ? formatter.format(data?.data?.cashOrderData?.gstAmt) : "-"} />
                    <ConfirmField label='Bank Charges' text={data?.data?.cashOrderData?.bankChargesAmt ? formatter.format(data?.data?.cashOrderData?.bankChargesAmt) : "-"} />
                    <ConfirmField label='Net Amount' text={data?.data?.cashOrderData.netAmt ? formatter.format(data?.data?.cashOrderData?.netAmt) : "-"} />

                    <ConfirmField label='Bank Details (To)' text={data?.data?.cashOrderData?.bankAccountName || "-"} />

                    <ConfirmField label='Description' text={data?.data?.cashOrderData?.description || "-"} />
                    <ConfirmField label='Created Date' text={formatDate(data?.data?.cashOrderData?.createDo || "-")} />
                </>}

                {/*Data credit*/}       
                {selectedData?.transactionType === TRANSACTION_TYPE_ENUM.CREDIT && <>
                    <ConfirmField label='Transaction Type' text={formatTransactionType(data?.data?.cashOrderData?.transactionType)} />
                    <ConfirmField label='Transaction Status' children={
                        <Button variant="normal" className={`${data?.data?.cashOrderData?.orderStatus ? check(data?.data?.cashOrderData?.orderStatus) : "-"}`}>{data?.data?.cashOrderData?.orderStatus}</Button>}
                    />

                    <ConfirmField label='Order Transaction ID' text={data?.data?.cashOrderData?.orderTransactionId || "-"} />
                    <ConfirmField label='ISIN' text={data?.data?.cashOrderData?.isin || "-"} />
                    <ConfirmField label='Product' text={data?.data?.cashOrderData?.productOrderableType || "-"} />

                    <ConfirmField label='Client Name' text={data?.data?.cashOrderData?.orgName || "-"} />
                    <ConfirmField label='Sub-org Name' text={data?.data?.cashOrderData?.subOrgName || "-"} />
                    <ConfirmField label='Cash Transaction Id' text={data?.data?.cashOrderData?.transactionId || "-"} />

                    <ConfirmField label='Currency' text={data?.data?.cashOrderData?.currency || "-"} />   
                    <ConfirmField label='Amount' text={`${data?.data?.cashOrderData?.totalCouponAmount ? formatter.format(Number(data?.data?.cashOrderData.totalCouponAmount)) : "-"}`} />
                    <ConfirmField label='Effective Date' text={formatDate(data?.data?.cashOrderData?.effectiveDo || "-")} />

                    <ConfirmField label='Fees' text={data?.data?.cashOrderData?.feesAmt ? formatter.format(data?.data?.cashOrderData?.feesAmt) : "-"} />
                    <ConfirmField label='GST' text={data?.data?.cashOrderData?.gstAmt ? formatter.format(data?.data?.cashOrderData?.gstAmt) : "-"} />
                    <ConfirmField label='Bank Charges' text={data?.data?.cashOrderData?.bankChargesAmt ? formatter.format(data?.data?.cashOrderData?.bankChargesAmt) : "-"} />
                    <ConfirmField label='Net Amount' text={data?.data?.cashOrderData?.netAmt ? formatter.format(data?.data?.cashOrderData?.netAmt) : "-"} />

                    <ConfirmField label='Bank Details (To)' text={data?.data?.cashOrderData?.bankAccountName || "-"} />

                    <ConfirmField label='Description' text={data?.data?.cashOrderData?.description || "-"} />
                    <ConfirmField label='Created Date' text={formatDate(data?.data?.cashOrderData?.createDo || "-")} />
                </>}

            </div>
        </div>
    </>)
}