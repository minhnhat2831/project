import Button from "@/components/common/form/baseForm/Button"
import { useFormContext } from "react-hook-form"
import { useModalCreateStore } from "../../store/useModalCreateStore"
import { toast } from "react-toastify"
import { useModalConfirmStore } from "../../store/useModelConfirmStore"
import { TRANSACTION_CREDIT_ENUM } from "../../constants/TransactionType"
import useTransactionForm from "../../hooks/useTransactionForm"

export default function SubmitConfirm({ onBack, onSubmit }: { onBack: () => void, onSubmit: () => void }) {
    const { setOpen } = useModalCreateStore()
    const { setType } = useModalConfirmStore()
    const { couponMapFormToPayload, debitMapFormToPayload } = useTransactionForm()
    const { getValues, watch } = useFormContext()

    const data = getValues() as { action: string; data: any }
    const watchAll = watch()
    const mappedData = watchAll.data.transactionType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT
        ? couponMapFormToPayload(data)
        : debitMapFormToPayload(data)

    return (
        <div className="p-6 space-y-4 overflow-auto">
            <h3 className="text-lg font-semibold">Confirm Transaction</h3>

            <pre className="bg-gray-100 p-4 rounded text-sm">
                {(watchAll.data.transactionType !== TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT) &&
                    <div className="flex gap-20 px-5">
                        <div className="w-auto">
                            <p>Transaction Type : {watchAll.data.transactionType}</p>
                            <p>Action : {watchAll.action} </p>
                            <p>Org Num : {watchAll.data.orgNum.id} </p>
                            <p>Sub Org Num : {watchAll.data.subOrgNum.subOrgId} </p>
                            <p>Currency : {watchAll.data.currency} </p>
                            <p>Amount : {watchAll.data.amount}</p>
                            <p>Effective Data : {watchAll.data.effectiveDo} </p>
                            <p>Description : {watchAll.data.description} </p>
                        </div>
                        <div className="w-auto">
                            <p>Fees Amt : {watchAll.data.feesAmt} </p>
                            <p>Gst Amt : {watchAll.data.gstAmt} </p>
                            <p>Bank Charges Amt : {watchAll.data.bankChargesAmt}</p>
                            <p>BankAccount Uid : {watchAll.data.bankAccountUid.bankAccountUid} </p>
                            <p>Created Date : {watchAll.data.createdDo} </p>
                            <p>Comments : {watchAll.data.comments} </p>
                            <p>Files : </p>
                            <ul className="list-disc overflow-hidden text-wrap">
                                {watchAll.data.files?.map((file: any, index: number) => (
                                    <li key={index}>
                                        {file.name} ({Math.round(file.size / 1024)} KB)
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>}

                {(watchAll.data.transactionType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT) &&
                    <div className="flex gap-20 px-5">
                        <div className="w-auto">
                            <p>Transaction Type : {watchAll.data.transactionType}</p>
                            <p>Action : {watchAll.action} </p>
                            {watchAll.data.couponPayments?.map((item: any, index: number) => (
                                <div key={index} className="mb-3">
                                    <p className="font-semibold">Coupon Payment :{index + 1}</p>
                                    <p> - Client Name : {item.clientName}</p>
                                    <p> - Organization Num : {item.organizationNum}</p>
                                    <p> - Sub-Organization Num : {item.subOrganizationNum}</p>
                                    <p> - Sub-Account Num : {item.subAccountNum}</p>
                                    <p> - Cash Order Amt : {item.cashOrderAmt}</p>
                                    <p> - Bank-Account(To) : {item.bankAccountTo}</p>
                                </div>
                            ))}
                        </div>
                        <div className="w-auto lg:w-auto text-wrap">
                            <p>Currency : {watchAll.data.currency} </p>
                            <p>Total Coupon Amount : {watchAll.data.totalCouponAmount} </p>
                            <p>Isin : {watchAll.data.isin} </p>
                            <p>Coupon Percentage Rate : {watchAll.data.couponPercentageRate} %</p>
                            <p>Payment Date: {watchAll.data.paymentDo} </p>
                            <p>Comments : {watchAll.data.comments} </p>
                            <p>Files : </p>
                            <ul className="list-disc text-wrap overflow-hidden">
                                {watchAll.data.files?.map((file: any, index: number) => (
                                    <li key={index}>
                                       * {file.name} ({Math.round(file.size / 1024)} KB)
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
