import { useList } from "@/modules/cashTransaction/hooks/useListData"
import { useDataStore } from "@/modules/cashTransaction/store/useDataStore"
import ConfirmField from "../../common/ConfirmField"
import { TRANSACTION_STATUS_ENUM, TRANSACTION_TYPE_LABEL_MAP } from "@/modules/cashTransaction/constants/TransactionType"
import Button from "@/components/common/form/baseForm/Button"
import { formatDate } from "@/utils/formatDate"
import { formatter } from "@/utils/formatNumber"

export default function CashTransactionViewTableItem() {
    const { selectedData } = useDataStore()
    const { useGetListDetail } = useList()
    const { data } = useGetListDetail(selectedData?.transactionId)

    const transactionData = data?.data?.cashOrderData

    const checkStatus = (status: string): string => {
        const statusMap: Record<string, string> = {
            [TRANSACTION_STATUS_ENUM.DRAFT]: 'bg-blue-500 text-white',
            [TRANSACTION_STATUS_ENUM.COMPLETE]: 'bg-green-500 text-white',
            [TRANSACTION_STATUS_ENUM.PENDING]: 'bg-orange-500 text-white',
            [TRANSACTION_STATUS_ENUM.PENDING_MAKER]: 'bg-red-500 text-white',
        };
        return statusMap[status] || '';
    };

    const formatTransactionType = (value?: string) => {
        if (!value) return '-'
        return TRANSACTION_TYPE_LABEL_MAP[value] ?? value
    }

    return (<>
        <ConfirmField label="Transaction Type" text={formatTransactionType(transactionData?.transactionType)} />
        <ConfirmField label="Transaction Status" children={
            <Button variant="normal"
                className={`w-30 ${transactionData?.orderStatus ? checkStatus(transactionData?.orderStatus) : "-"}`}>
                {formatTransactionType(transactionData?.orderStatus)}
            </Button>} /><br></br>

        <ConfirmField label="Isin" text={transactionData?.isin} />
        <ConfirmField label="Security" text={transactionData?.securityName} />
        <ConfirmField label="Coupon Payment Rate" text={transactionData?.couponPaymentRate ? transactionData?.couponPaymentRate + "%" : "-"} /><br></br>

        <div className="overflow-x-auto">
            <table className="w-full text-sm border">
                <thead className="sticky -top-4 z-20 border bg-white">
                    <tr className="border-b-2">
                        <th className="px-3 py-4 text-left font-semibold border whitespace-nowrap">Client Name / Suborg Name</th>
                        <th className="px-3 py-4 text-left font-semibold border whitespace-nowrap">Bank Account (to)</th>
                        <th className="px-3 py-4 text-left font-semibold border whitespace-nowrap">Value of Settled Holdings</th>
                        <th className="px-3 py-4 text-left font-semibold border whitespace-nowrap">Net Payment Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactionData?.orgName === null && (
                        <tr>
                            <td colSpan={4} className="text-center py-6 text-gray-400 font-serif">
                                No result
                            </td>
                        </tr>
                    )}

                    {transactionData?.orgName && <>
                        <tr>
                            <td className="px-3 py-3 border font-serif">{transactionData?.orgName}
                                <div className="font-bold">{transactionData?.subOrgName}</div>
                            </td>
                            <td className="px-3 py-3 border font-serif">{transactionData?.bankAccountName}</td>
                            <td className="px-3 py-3 border font-serif">{formatter(transactionData?.currency).format(Number(transactionData?.runningBal)) || "-"}</td>
                            <td className="px-3 py-3 border font-serif">{formatter(transactionData?.currency).format(Number(transactionData?.netAmt))}</td>
                        </tr>
                    </>}
                </tbody>
            </table>
        </div><br></br>

        <ConfirmField label="Total Coupon Payment Amount" text={formatter(transactionData?.currency).format(Number(transactionData?.totalCouponAmount))} />
        <ConfirmField label="Payment Date" text={formatDate(transactionData?.payDt || "-")} />
    </>)
}