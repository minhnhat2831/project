import Button from "@/components/common/form/baseForm/Button"
import { useFormContext } from "react-hook-form"
import { useModalCreateStore } from "../../store/useModalCreateStore"
import { toast } from "react-toastify"
import { useModalConfirmStore } from "../../store/useModalConfirmStore"
import { TRANSACTION_CREDIT_ENUM, TRANSACTION_DEBIT_ENUM, TRANSACTION_TYPE_LABEL_MAP } from "../../constants/TransactionType"
import useTransactionForm from "../../hooks/useTransactionForm"
import ConfirmField from "./ConfirmField"
import { useBankAccount } from "../../hooks/useBankAccount"
import { formatDate } from "@/utils/formatDate"
import { formatter } from "@/utils/formatNumber"

export default function SubmitConfirm({ onBack, onSubmit }: { onBack: () => void, onSubmit: () => void }) {
    const { setOpen } = useModalCreateStore()
    const { setType } = useModalConfirmStore()
    const { couponMapFormToPayload, debitMapFormToPayload } = useTransactionForm()
    const { getValues, watch } = useFormContext()
    const { useGetBankAccounts } = useBankAccount()
    const { data: bankData } = useGetBankAccounts()
    const watchAll = watch()

    const formatBank = (value: string) => {
        const bank = bankData?.data.find(f => f.bankAccountUid === value)?.displayName
        return bank
    }
    const data = getValues() as { action: string; data: any }

    const mappedData = watchAll.data.transactionType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT
        ? couponMapFormToPayload(data)
        : debitMapFormToPayload(data)

    const formatTransactionType = (value?: string) => {
        if (!value) return '-'
        return TRANSACTION_TYPE_LABEL_MAP[value] ?? value
    }

    function checkType(value: "Fees" | "GST" | "BankCharges") {
        if (watchAll.data.transactionType === TRANSACTION_DEBIT_ENUM.TAX_WITHHOLDING) {
            return false
        }

        switch (value) {
            case "GST":
                return true

            case "Fees":
                return [
                    TRANSACTION_DEBIT_ENUM.WITHDRAWAL,
                    TRANSACTION_DEBIT_ENUM.DEBIT_OTHER,
                    TRANSACTION_CREDIT_ENUM.DEPOSIT,
                    TRANSACTION_CREDIT_ENUM.CREDIT_OTHER,
                ].includes(watchAll.data.transactionType as TRANSACTION_DEBIT_ENUM | TRANSACTION_CREDIT_ENUM)

            case "BankCharges":
                return [
                    TRANSACTION_DEBIT_ENUM.WITHDRAWAL,
                    TRANSACTION_DEBIT_ENUM.DEBIT_OTHER,
                ].includes(watchAll.data.transactionType as TRANSACTION_DEBIT_ENUM)

            default:
                return false
        }
    }

    return (
        <div className="p-6 space-y-4 overflow-auto">
            <h3 className="text-lg font-semibold">Confirm Transaction</h3>

            <pre className="bg-gray-100 p-4 text-sm">
                {(watchAll.data.transactionType !== TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT) &&
                    <div className="px-5 text-wrap">
                        <ConfirmField
                            label="Transaction Type"
                            text={formatTransactionType(watchAll.data.transactionType)}
                        />
                        <ConfirmField label="Transaction status" text={watchAll.action} />
                        <ConfirmField label="Client Name" text={(watchAll.data.orgNum.name) || "-"} />
                        <ConfirmField label="Sub Org Name" text={(watchAll.data.subOrgNum.name) || "-"} />
                        <ConfirmField label="Currency" text={watchAll.data.currency || "-"} />
                        <ConfirmField label="Amount" text={formatter(watchAll.data.currency).format(watchAll.data.amount)} />
                        <ConfirmField label="Effective Date" text={formatDate(watchAll.data.effectiveDo)} />
                        <ConfirmField label="Description" text={watchAll.data.description || "-"} />
                        {checkType("Fees") && <ConfirmField label="Fees Amt" text={formatter(watchAll.data.currency).format(watchAll.data.feesAmt)} />}
                        {checkType("GST") && <ConfirmField label="Gst Amt" text={formatter(watchAll.data.currency).format(watchAll.data.gstAmt)} />}
                        {checkType("BankCharges") && <ConfirmField label="Bank Charges Amt" text={formatter(watchAll.data.currency).format(watchAll.data.bankChargesAmt)} />}
                        <ConfirmField label="Bank Account" text={(watchAll.data.bankAccountUid?.displayName) || "-"} />
                        <ConfirmField label="Created Date" text={formatDate(watchAll.data.createdDo)} />
                        <ConfirmField label="Comments" text={watchAll.data.comments || "-"} />
                        <label className="w-50">Files :</label>
                        <ul className="list-disc text-wrap overflow-hidden">
                            {watchAll.data.files?.map((file: any, index: number) => (
                                <li key={index}>
                                    {file.name} ({Math.round(file.size / 1024)} KB)
                                </li>
                            ))}
                        </ul>
                    </div>}

                {(watchAll.data.transactionType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT) && <>
                    <div className="px-5 text-wrap">
                        <ConfirmField
                            label="Transaction Type"
                            text={formatTransactionType(watchAll.data.transactionType)}
                        />
                        <ConfirmField label="Transaction status" text={watchAll.action} />
                        <ConfirmField label="Isin" text={watchAll.data.isin || "-"} />
                        <ConfirmField label="Currency" text={watchAll.data.currency || "-"} />
                        {watchAll.data.couponPayments?.map((item: any, index: number) => (
                            <div key={index} className="mb-3">
                                <p className="font-semibold">* Coupon Payment : {index + 1}</p>
                                <ConfirmField label=" - Client Name" text={item.clientName || "-"} />
                                <ConfirmField label=" - SubOrg Name" text={item.subOrganizationName || "-"} />
                                <ConfirmField label=" - Cash Order Amt" text={formatter(watchAll.data.currency).format(item.cashOrderAmt)} />
                                <ConfirmField label=" - Bank-Account(To)" text={formatBank(item.bankAccountTo) || "-"} />
                            </div>
                        ))}
                        <ConfirmField label="Coupon Percentage Rate" text={`${watchAll.data.couponPercentageRate} %`} />
                        <ConfirmField label="Total Coupon Amount" text={formatter(watchAll.data.currency).format(watchAll.data.totalCouponAmount)} />
                        <ConfirmField label="Payment Date" text={formatDate(watchAll.data.paymentDo)} />
                        <ConfirmField label="Description" text={watchAll.data.description || "-"} />
                        <ConfirmField label="Comments" text={watchAll.data.comments || "-"} />
                        <label className="w-50">Files :</label>
                        <ul className="list-disc text-wrap overflow-hidden">
                            {watchAll.data.files?.map((file: any, index: number) => (
                                <li key={index}>
                                    {file.name} ({Math.round(file.size / 1024)} KB)
                                </li>
                            ))}
                        </ul>
                    </div>
                </>}
            </pre>

            <div className="flex h-1/2 justify-end rounded-b-xl py-4 mt-auto border-t bg-white">
                <div className="flex justify-end">
                    <Button
                        type="button"
                        variant="normal"
                        size="sm"
                        className="w-30 mr-1 border hover:bg-gray-200 overflow-hidden"
                        onClick={onBack}>
                        Back
                    </Button>

                    <Button
                        type="button"
                        variant="normal"
                        size="sm"
                        className="w-40 mr-1 border bg-red-500 text-white hover:bg-red-700 overflow-hidden"
                        onClick={() => {
                            onSubmit()
                            console.log("SUBMIT DATA PAYLOAD:", mappedData)
                            toast.success("Success")
                            setType("form")
                            setOpen(false)
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}