import { useList } from "@/modules/cashTransaction/hooks/useListData"
import { useDataStore } from "@/modules/cashTransaction/store/useDataStore"
import ConfirmField from "../../common/ConfirmField"
import { TRANSACTION_CREDIT_ENUM, TRANSACTION_DEBIT_ENUM, TRANSACTION_STATUS_ENUM, TRANSACTION_TYPE_ENUM, TRANSACTION_TYPE_LABEL_MAP, transactionTypeCredit, transactionTypeDebit } from "@/modules/cashTransaction/constants/TransactionType"
import Button from "@/components/common/form/baseForm/Button"
import { formatter } from "@/utils/formatNumber"
import { formatDate } from "@/utils/formatDate"
import Select from "react-select"
import { useModalCreateStore } from "@/modules/cashTransaction/store/useModalCreateStore"
import { NumericFormat } from "react-number-format"
import DateInput from "@/components/common/form/baseForm/DateTimeInput"
import { Icons } from "@/components/common/base/Icon"

type TransactionOption = { value: TRANSACTION_DEBIT_ENUM | TRANSACTION_CREDIT_ENUM; label: string }

interface props {
    status?: string,
    transactionType: string
}
export default function CashTransactionViewListItem({ status, transactionType }: props) {
    const { selectedData } = useDataStore()
    const { useGetListDetail } = useList()
    const { typeMode } = useModalCreateStore()
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
        {/* View */}
        {(status === TRANSACTION_STATUS_ENUM.COMPLETE || status === TRANSACTION_STATUS_ENUM.PENDING) && <>
            <ConfirmField label="Transaction Type" text={formatTransactionType(transactionData?.transactionType)} />
            <ConfirmField label="Status" children={
                <Button variant="normal"
                    className={`w-30 ${transactionData?.orderStatus ? checkStatus(transactionData?.orderStatus) : "-"}`}>
                    {formatTransactionType(transactionData?.orderStatus)}
                </Button>} /><br></br>

            {transactionType === TRANSACTION_TYPE_ENUM.CREDIT && <>
                <ConfirmField label="Order Transaction Id" text={transactionData?.orderTransactionId} />
                <ConfirmField label="Isin" text={transactionData?.isin} />
                <ConfirmField label="Product Orderable Type" text={transactionData?.productOrderableType} /><br></br>
            </>}

            <ConfirmField label="Client Name" text={transactionData?.orgName} />
            <ConfirmField label="Sub Org Name" text={transactionData?.subOrgName} />
            <ConfirmField label="Transaction Id" text={transactionData?.transactionId} /><br></br>

            {transactionData?.transactionType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT && <>
                <ConfirmField label="Group ID" text={transactionData?.groupId} />
                <ConfirmField label="Account Number" text={transactionData?.bankAccountNum} /><br></br>
            </>}

            <ConfirmField label={transactionData?.transactionType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT ? "Account Name (To)" : "Bank Detail (To)"} text={transactionData?.bankAccountName} />
            <ConfirmField label="Currency" text={transactionData?.currency} />
            <ConfirmField label="Total Coupon Amount" text={transactionData?.totalCouponAmount || "-"} /><br></br>

            <ConfirmField label="FeesAmt" text={formatter(transactionData?.currency).format(Number(transactionData?.feesAmt))} />
            <ConfirmField label="GstAmt" text={formatter(transactionData?.currency).format(Number(transactionData?.gstAmt))} />
            <ConfirmField label="BankChargesAmt" text={formatter(transactionData?.currency).format(Number(transactionData?.bankChargesAmt))} />
            <ConfirmField label="NetAmt" text={formatter(transactionData?.currency).format(Number(transactionData?.netAmt))} /><br></br>

            <ConfirmField label="Description" text={transactionData?.description} />
            <ConfirmField label="Effective Date" text={formatDate(transactionData?.effectiveDo || "-")} />
            <ConfirmField label="Create Date" text={formatDate(transactionData?.createDo || "-")} /><br></br>
        </>}

        {/* Edit */}
        {(status === TRANSACTION_STATUS_ENUM.PENDING_MAKER || status === TRANSACTION_STATUS_ENUM.DRAFT) && (
            <>
                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">
                        Transaction Type <span className="text-red-500">*</span>
                    </label>
                    <Select<TransactionOption>
                        className="w-80"
                        value={transactionTypeDebit.find(i => i.value === transactionData?.transactionType)}
                        options={typeMode === "Debit" ? transactionTypeDebit : transactionTypeCredit}
                        defaultValue={transactionData?.transactionType ? { label: formatTransactionType(transactionData.transactionType), value: transactionData.transactionType as TRANSACTION_DEBIT_ENUM | TRANSACTION_CREDIT_ENUM } : undefined}
                    />
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">Transaction Status</label>
                    <Button
                        variant="normal"
                        className={`w-30 ${checkStatus(transactionData?.orderStatus || "-")}`}
                    >
                        {formatTransactionType(transactionData?.orderStatus)}
                    </Button>
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">Client Name</label>
                    <Select
                        isSearchable
                        isClearable
                        className="w-80"
                        value={{ label: transactionData?.orgName, value: transactionData?.orgNum }}
                    />
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">Sub-Org Name</label>
                    <Select
                        className="w-80"
                        value={{ label: transactionData?.subOrgName, value: transactionData?.subOrgNum }}
                    />
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">Cash Transaction ID</label>
                    <span className="font-medium">{transactionData?.transactionId}</span>
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">
                        Currency <span className="text-red-500">*</span>
                    </label>
                    <Select className="w-80"
                        value={{ label: transactionData?.currency, value: transactionData?.currency }}
                    />
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">
                        Amount <span className="text-red-500">*</span>
                    </label>
                    <NumericFormat
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="0.00"
                        className={`border h-10 px-4 py-4 rounded shadow-md text-md w-80 focus:outline focus:outline-green-300 hover:outline hover:outline-green-300 mb-2 mt-2`}
                        defaultValue={transactionData?.totalCouponAmount || "-"}
                    />
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">
                        Fees <span className="text-gray-400"><Icons.Error /></span>
                    </label>
                    <NumericFormat
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="0.00"
                        className={`border h-10 px-4 py-4 rounded shadow-md text-md w-80 focus:outline focus:outline-green-300 hover:outline hover:outline-green-300 mb-2 mt-2`}
                        defaultValue={transactionData?.feesAmt || "-"}
                    />
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">GST (15%)</label>
                    <NumericFormat
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="0.00"
                        className={`border h-10 px-4 py-4 rounded shadow-md text-md w-80 focus:outline focus:outline-green-300 hover:outline hover:outline-green-300 mb-2 mt-2`}
                        defaultValue={transactionData?.gstAmt || "-"}
                    />
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">
                        Bank Charges <span className="text-gray-400"><Icons.Error /></span>
                    </label>
                    <NumericFormat
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        placeholder="0.00"
                        className={`border h-10 px-4 py-4 rounded shadow-md text-md w-80 focus:outline focus:outline-green-300 hover:outline hover:outline-green-300 mb-2 mt-2`}
                        defaultValue={transactionData?.bankChargesAmt || "-"}
                    />
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">Net Amount</label>
                    <NumericFormat
                        thousandSeparator=","
                        decimalSeparator="."
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        disabled
                        placeholder="0.00"
                        className={`border h-10 px-4 py-4 rounded shadow-md text-md w-80 bg-gray-200 mb-2 mt-2`}
                        defaultValue={formatter(transactionData?.currency)
                            .format(Number(transactionData?.netAmt ?? 0))}
                    />
                </div>

                <div className="flex py-4 items-center">
                    <label className="w-50 shrink-0">
                        Effective Date <span className="text-red-500">*</span>
                    </label>
                    <DateInput
                        defaultValue={transactionData?.effectiveDo || "-"}
                    />
                </div>
            </>
        )}

    </>)
}