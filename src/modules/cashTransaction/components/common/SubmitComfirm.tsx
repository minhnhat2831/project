import Button from "@/components/common/form/baseForm/Button"
import { useFormContext } from "react-hook-form"
import { useModalCreateStore } from "../../store/useModalCreateStore"
import { toast } from "react-toastify"
import { useModalConfirmStore } from "../../store/useModelConfirmStore"
import { TRANSACTION_CREDIT_ENUM, TRANSACTION_DEBIT_ENUM, TRANSACTION_TYPE_LABEL_MAP } from "../../constants/TransactionType"
import useTransactionForm from "../../hooks/useTransactionForm"
import { useBankAccount } from "../../hooks/useBankAccount"
import { useOrg } from "../../hooks/useOrg"

export default function SubmitConfirm({ onBack, onSubmit }: { onBack: () => void, onSubmit: () => void }) {
    const { setOpen } = useModalCreateStore()
    const { setType } = useModalConfirmStore()
    const { couponMapFormToPayload, debitMapFormToPayload } = useTransactionForm()
    const { getValues, watch } = useFormContext()
    const watchAll = watch()
    const { getBankAccounts } = useBankAccount()
    const { data: bankAccountData } = getBankAccounts()
    const { useGetListOrgs, useGetListSubOrgs } = useOrg();
    const { data: orgData } = useGetListOrgs();
    const { data: subOrgData } = useGetListSubOrgs(watchAll.data.orgNum.id)

    const data = getValues() as { action: string; data: any }

    const mappedData = watchAll.data.transactionType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT
        ? couponMapFormToPayload(data)
        : debitMapFormToPayload(data)

    const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: watchAll.data.currency ? watchAll.data.currency : "VND" });

    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}`;
    };

    const formatBank = (bank: string) => {
        if(!bank) return "-"
        const displayName = bankAccountData?.data.find(b => b.bankAccountUid === bank)?.displayName
        return displayName
    }

    const formatOrg = (org: string) => {
        if(!org) return "-"
        const orgName = orgData?.data.find(o => o.id === org)?.name
        return orgName
    }

    const formatSubOrg = (subOrg: string) => {
        if(!subOrg) return "-"
        const subOrgName = subOrgData?.data.find(so => so.subOrgId === subOrg)?.name
        return subOrgName
    }

    const formatTransactionType = (value?: string) => {
        if (!value) return '-'
        return TRANSACTION_TYPE_LABEL_MAP[value] ?? value
    }

    return (
        <div className="p-6 space-y-4 overflow-auto">
            <h3 className="text-lg font-semibold">Confirm Transaction</h3>

            <pre className="bg-gray-100 p-4 rounded text-sm">
                {(watchAll.data.transactionType !== TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT) &&
                    <div className="flex gap-20 px-5">
                        <div className="w-auto text-wrap">
                            <p>Transaction Type : {formatTransactionType(watchAll.data.transactionType)}</p>
                            <p>Action : {watchAll.action} </p>
                            <p>Client Name : {formatOrg(watchAll.data.orgNum.id)} </p>
                            <p>Sub Org Name : {formatSubOrg(watchAll.data.subOrgNum.subOrgId)} </p>
                            <p>Currency : {watchAll.data.currency ? watchAll.data.currency : "-"} </p>
                            <p>Amount : {formatter.format(watchAll.data.amount)}</p>
                            <p>Effective Data : {formatDate(watchAll.data.effectiveDo)} </p>
                            <p>Description : {watchAll.data.description ? watchAll.data.description : "-"} </p>
                        </div>
                        <div className="w-auto text-wrap">
                            {(watchAll.data.transactionType === TRANSACTION_DEBIT_ENUM.WITHDRAWAL || watchAll.data.transactionType === TRANSACTION_CREDIT_ENUM.DEPOSIT) && <>
                                <p>Fees Amt : {formatter.format(watchAll.data.feesAmt)} </p>
                                <p>Gst Amt : {formatter.format(watchAll.data.gstAmt)} </p>
                                <p>Bank Charges Amt : {formatter.format(watchAll.data.bankChargesAmt)}</p></>}
                            <p>BankAccount : {formatBank(watchAll.data.bankAccountUid.bankAccountUid)} </p>
                            <p>Created Date : {formatDate(watchAll.data.createdDo)} </p>
                            <p>Comments : {watchAll.data.comments ? watchAll.data.comments : "-"} </p>
                            <p>Files : </p>
                            <ul className="list-disc overflow-hidden text-wrap">
                                {watchAll.data.files?.map((file: any, index: number) => (
                                    <li key={index}>
                                        * {file.name} ({Math.round(file.size / 1024)} KB)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}

                {(watchAll.data.transactionType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT) &&
                    <div className="flex gap-20 px-5">
                        <div className="w-auto text-wrap">
                            <p>Transaction Type : {formatTransactionType(watchAll.data.transactionType)}</p>
                            <p>Action : {watchAll.action} </p>
                            {watchAll.data.couponPayments?.map((item: any, index: number) => (
                                <div key={index} className="mb-3">
                                    <p className="font-semibold">Coupon Payment : {index + 1}</p>
                                    <p> - Client Name : {item.clientName ? item.clientName : "-"}</p>
                                    <p> - SubOrg Name : {item.subOrganizationName ?? "-"}</p>
                                    <p> - Cash Order Amt : {formatter.format(item.cashOrderAmt)}</p>
                                    <p> - Bank-Account(To) : {formatBank(item.bankAccountTo)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-auto lg:w-auto text-wrap">
                            <p>Currency : {watchAll.data.currency ? watchAll.data.currency : "-"} </p>
                            <p>Total Coupon Amount : {formatter.format(watchAll.data.totalCouponAmount)}</p>
                            <p>Isin : {watchAll.data.isin ? watchAll.data.isin : "-"} </p>
                            <p>Coupon Percentage Rate : {watchAll.data.couponPercentageRate} %</p>
                            <p>Payment Date: {formatDate(watchAll.data.paymentDo)} </p>
                            <p>Comments : {watchAll.data.comments ? watchAll.data.comments : "-"} </p>
                            <p>Files : </p>
                            <ul className="list-disc text-wrap overflow-hidden">
                                {watchAll.data.files?.map((file: any, index: number) => (
                                    <li key={index}>
                                        {file.name} ({Math.round(file.size / 1024)} KB)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                }
            </pre>

            <div className="flex justify-end rounded-b-xl py-4 mt-auto border-t bg-white">
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
