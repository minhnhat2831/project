import { Icons } from "@/components/common/base/Icon"
import { useOpenFormStore } from "@/modules/cashTransaction/store/useModalFormStore"
import ConfirmField from "../../common/ConfirmField"
import { useDataStore } from "@/modules/cashTransaction/store/useDataStore"
import { TRANSACTION_STATUS_ENUM, TRANSACTION_TYPE_ENUM, TRANSACTION_TYPE_LABEL_MAP } from "@/modules/cashTransaction/constants/TransactionType"
import Button from "@/components/common/form/baseForm/Button"
import { useList } from "@/modules/cashTransaction/hooks/useListData"
import { formatDate } from "@/utils/formatDate"
import { formatter } from "@/utils/formatNumber"

export default function CashTransactionViewDetail() {
    const { open, setOpen } = useOpenFormStore()
    const { selectedData } = useDataStore()
    const { useGetListDetail } = useList()
    const { data } = useGetListDetail(selectedData?.transactionId)

    const formatTransactionType = (value?: string) => {
        if (!value) return '-'
        return TRANSACTION_TYPE_LABEL_MAP[value] ?? value
    }

    const checkStatus = (status: string): string => {
        const statusMap: Record<string, string> = {
            [TRANSACTION_STATUS_ENUM.DRAFT]: 'bg-blue-500 text-white',
            [TRANSACTION_STATUS_ENUM.COMPLETE]: 'bg-green-500 text-white',
            [TRANSACTION_STATUS_ENUM.PENDING]: 'bg-orange-500 text-white',
            [TRANSACTION_STATUS_ENUM.PENDINGMAKER]: 'bg-red-500 text-white',
        };
        return statusMap[status] || '';
    };

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

                {/*Data deposit*/}
                {selectedData?.transactionType === TRANSACTION_TYPE_ENUM.DEPOSIT && <>
                    <ConfirmField label='Transaction Type' text={formatTransactionType(data?.data?.cashOrderData.transactionType)} />
                    <ConfirmField label='Transaction Status' children={
                        <Button variant="normal" className={`w-40 ${data?.data?.cashOrderData?.orderStatus ? checkStatus(data?.data?.cashOrderData?.orderStatus) : "-"}`}>{data?.data?.cashOrderData?.orderStatus}</Button>}
                    />

                    <ConfirmField label='Client Name' text={data?.data?.cashOrderData.orgName || "-"} />
                    <ConfirmField label='Sub-Org Name' text={data?.data?.cashOrderData?.subOrgName || "-"} />
                    <ConfirmField label='Cash Transaction Id' text={data?.data?.cashOrderData?.transactionId || "-"} />

                    <ConfirmField label='Currency' text={data?.data?.cashOrderData?.currency || "-"} />
                    <ConfirmField label='Amount' text={data?.data?.cashOrderData?.totalCouponAmount ? formatter(data?.data?.cashOrderData?.currency).format(Number(data?.data?.cashOrderData.totalCouponAmount)) : "-"} />
                    <ConfirmField label='Effective Date' text={formatDate(data?.data?.cashOrderData?.effectiveDo || "-")} />

                    <ConfirmField label='Fees' text={data?.data?.cashOrderData?.feesAmt ? formatter(data?.data?.cashOrderData?.currency).format(data?.data?.cashOrderData?.feesAmt) : "-"} />
                    <ConfirmField label='GST' text={data?.data?.cashOrderData?.gstAmt ? formatter(data?.data?.cashOrderData?.currency).format(data?.data?.cashOrderData?.gstAmt) : "-"} />
                    <ConfirmField label='Bank Charges' text={data?.data?.cashOrderData?.bankChargesAmt ? formatter(data?.data?.cashOrderData.currency).format(data?.data?.cashOrderData.bankChargesAmt) : "-"} />
                    <ConfirmField label='Net Amount' text={data?.data?.cashOrderData.netAmt ? formatter(data?.data?.cashOrderData?.currency).format(data?.data?.cashOrderData?.netAmt) : "-"} />

                    <ConfirmField label='Bank Details (To)' text={data?.data?.cashOrderData?.bankAccountName || "-"} />
                    <ConfirmField label='Description' text={data?.data?.cashOrderData?.description || "-"} />
                    <ConfirmField label='Created Date' text={formatDate(data?.data?.cashOrderData?.createDo || "-")} />
                </>}

                {/*Data credit*/}
                {selectedData?.transactionType === TRANSACTION_TYPE_ENUM.CREDIT && <>
                    <ConfirmField label='Transaction Type' text={formatTransactionType(data?.data?.cashOrderData?.transactionType)} />
                    <ConfirmField label='Transaction Status' children={
                        <Button variant="normal" className={`w-40 ${data?.data?.cashOrderData?.orderStatus ? checkStatus(data?.data?.cashOrderData?.orderStatus) : "-"}`}>{data?.data?.cashOrderData?.orderStatus}</Button>}
                    />

                    <ConfirmField label='Order Transaction ID' text={data?.data?.cashOrderData?.orderTransactionId || "-"} />
                    <ConfirmField label='ISIN' text={data?.data?.cashOrderData?.isin || "-"} />
                    <ConfirmField label='Product' text={data?.data?.cashOrderData?.productOrderableType || "-"} />

                    <ConfirmField label='Client Name' text={data?.data?.cashOrderData?.orgName || "-"} />
                    <ConfirmField label='Sub-org Name' text={data?.data?.cashOrderData?.subOrgName || "-"} />
                    <ConfirmField label='Cash Transaction Id' text={data?.data?.cashOrderData?.transactionId || "-"} />

                    <ConfirmField label='Currency' text={data?.data?.cashOrderData?.currency || "-"} />
                    <ConfirmField label='Amount' text={`${data?.data?.cashOrderData?.totalCouponAmount ? formatter(data?.data?.cashOrderData?.currency).format(Number(data?.data?.cashOrderData.totalCouponAmount)) : "-"}`} />
                    <ConfirmField label='Effective Date' text={formatDate(data?.data?.cashOrderData?.effectiveDo || "-")} />

                    <ConfirmField label='Fees' text={data?.data?.cashOrderData?.feesAmt ? formatter(data?.data?.cashOrderData.currency).format(data?.data?.cashOrderData.feesAmt) : "-"} />
                    <ConfirmField label='GST' text={data?.data?.cashOrderData?.gstAmt ? formatter(data?.data?.cashOrderData.currency).format(data?.data?.cashOrderData.gstAmt) : "-"} />
                    <ConfirmField label='Bank Charges' text={data?.data?.cashOrderData?.bankChargesAmt ? formatter(data?.data?.cashOrderData.currency).format(data?.data?.cashOrderData.bankChargesAmt) : "-"} />
                    <ConfirmField label='Net Amount' text={data?.data?.cashOrderData?.netAmt ? formatter(data?.data?.cashOrderData?.currency).format(data?.data?.cashOrderData?.netAmt) : "-"} />

                    <ConfirmField label='Bank Details (To)' text={data?.data?.cashOrderData?.bankAccountName || "-"} />

                    <ConfirmField label='Description' text={data?.data?.cashOrderData?.description || "-"} />
                    <ConfirmField label='Created Date' text={formatDate(data?.data?.cashOrderData?.createDo || "-")} />
                </>}

                {/*Data coupon payment*/}
                {selectedData?.transactionType === TRANSACTION_TYPE_ENUM.COUPON_PAYMENT && <>
                    <ConfirmField label='Transaction Type' text={formatTransactionType(data?.data?.cashOrderData?.transactionType)} />
                    <ConfirmField label='Transaction Status' children={
                        <Button variant="normal" className={`w-40 ${data?.data?.cashOrderData?.orderStatus ? checkStatus(data?.data?.cashOrderData?.orderStatus) : "-"}`}>{data?.data?.cashOrderData?.orderStatus}</Button>}
                    />

                    <ConfirmField label='Client Name' text={data?.data?.cashOrderData?.orgName || "-"} />
                    <ConfirmField label='Sub-org Name' text={data?.data?.cashOrderData?.subOrgName || "-"} />
                    <ConfirmField label='Cash Transaction Id' text={data?.data?.cashOrderData?.transactionId || "-"} />
                    <ConfirmField label='Group Id' text={data?.data?.cashOrderData?.groupId || "-"} />

                    <ConfirmField label='Account Name (To)' text={data?.data?.cashOrderData?.bankAccountName || "-"} />
                    <ConfirmField label='Account Number' text={data?.data?.cashOrderData?.bankAccountNum || "-"} />

                    <ConfirmField label='ISIN' text={data?.data?.cashOrderData?.isin || "-"} />
                    <ConfirmField label='Security Name' text={data?.data?.cashOrderData?.securityName || "-"} />
                    <ConfirmField label='Currency' text={data?.data?.cashOrderData?.currency || "-"} />

                    <ConfirmField label='Net Amount' text={data?.data?.cashOrderData?.netAmt ? formatter(data?.data?.cashOrderData?.currency).format(data?.data?.cashOrderData?.netAmt) : "-"} />
                    <ConfirmField label='Coupon Payment Rate' text={`${data?.data?.cashOrderData?.couponPaymentRate || "-"}%`} />

                    <ConfirmField label='Created Date' text={formatDate(data?.data?.cashOrderData?.createDo || "-")} />
                    <ConfirmField label='Effective Date' text={formatDate(data?.data?.cashOrderData?.effectiveDo || "-")} />
                </>}

                {selectedData?.transactionType === TRANSACTION_TYPE_ENUM.DEBIT && <>
                    <ConfirmField label='Transaction Type' text={formatTransactionType(data?.data?.cashOrderData?.transactionType)} />
                    <ConfirmField label='Transaction Status' children={
                        <Button variant="normal" className={`w-40 ${data?.data?.cashOrderData?.orderStatus ? checkStatus(data?.data?.cashOrderData?.orderStatus) : "-"}`}>{data?.data?.cashOrderData?.orderStatus}</Button>}
                    />
                    <ConfirmField label='ISIN' text={data?.data?.cashOrderData?.isin || "-"} />
                    <ConfirmField label='Security Name' text={data?.data?.cashOrderData?.securityName || "-"} />
                    <ConfirmField label='Coupon Payment Rate' text={`${data?.data?.cashOrderData?.couponPaymentRate || "-"}%`} />

                    <table className="w-full text-left border mt-4">
                        <thead>
                            <tr>
                                <td className="border font-bold p-2">Client Name / Sub-org Name</td>
                                <td className="border font-bold p-2">Bank Accoount (to)</td>
                                <td className="border font-bold p-2">Value of Settled Holding</td>
                                <td className="border font-bold p-2">Net Payment Account (USD)</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-400 font-serif">
                                    No result
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <ConfirmField label='Total Coupon Payment Amount' text={data?.data?.cashOrderData?.totalCouponAmount ? formatter(data?.data?.cashOrderData?.currency).format(Number(data?.data?.cashOrderData?.totalCouponAmount)) : "-"} />
                    <ConfirmField label='Payment Date' text={formatDate(data?.data?.cashOrderData?.payDt || "-")} />
                </>}

            </div>
        </div>
    </>)
}