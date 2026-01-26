import { useState } from "react";
import { Icons } from "@/components/common/base/Icon";
import { transactionTypeCredit, transactionTypeDebit } from "../../../constants/TransactionType";
import ButtonStatus from "../../common/ButtonStatus";
import CashTransactionFormCredit from "../cashTransactionFormType/CashTransactionFormCoupon";
import { useFormContext } from "react-hook-form";
import CashTransactionFormDebit from "../cashTransactionFormType/CashTransactionFormDebit";
import SelectForm from "@/components/common/form/SelectForm";

interface props {
    typeMode?: "Debit" | "Credit"
}

export default function CashTransactionFormDetail({ typeMode }: props) {
    const [openForm, setOpenForm] = useState(true)
    const { control, watch, formState: { errors } } = useFormContext()
    const watchType = watch("transactionType")

    const renderModal = () => {
        {/* === DEBIT === */ }
            //(Withdrawal)
        if (typeMode === "Debit" && watchType == "Withdrawal") {
            return <CashTransactionFormDebit transactionType="Debit(other)" />
            //Debit (Others) | Fee | Tax Withholding
        } else if (typeMode === "Debit" && watchType) {
            return <CashTransactionFormDebit transactionType="Debit" />

            {/* === CREDIT === */ }
            //Coupon Payment
        } else if (typeMode === "Credit" && watchType == "Coupon Payment") {
            return <CashTransactionFormCredit />
            //Deposit
        } else if (typeMode === "Credit" && watchType == "Deposit") {
            return <CashTransactionFormDebit transactionType="Debit(other)" />
            //Credit (Others)    
        } else if (typeMode === "Credit" && watchType) {
            return <CashTransactionFormDebit transactionType="Debit" />
        }
    }

    return (
        <>
            <div className={`bg-white rounded-sm mb-5 transition-all duration-600 ease-in-out shadow-xl 
            ${openForm ? (watchType ? "h-auto" : "h-50") : "h-12"}`}>
                <div
                    className="border-b h-12 px-4 flex items-center cursor-pointer"
                    onClick={() => setOpenForm(!openForm)}
                >
                    <p className="font-bold">Transaction Details</p>
                    <div className="ml-auto transition-all duration-500">
                        {openForm ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
                    </div>
                </div>

                <div
                    className={`overflow-hidden px-4 transition-all duration-300 ease-in-out
                         ${openForm ? (watchType ? "h-auto pt-4" : "h-100 pt-2") : "h-0 pt-0"}`}
                >
                    <div className="flex mb-4 py-2">
                        <label className="mr-16 mt-1">Transaction Type<span className="text-red-500"> *</span></label>
                        <SelectForm
                            name="transactionType"
                            control={control}
                            options={typeMode === "Debit" ? transactionTypeDebit : transactionTypeCredit}
                            error={errors?.transactionType?.message}
                        />
                    </div>
                    <div className="flex">
                        <label className="mr-16 mt-1">Transaction Status</label>
                        <ButtonStatus />
                    </div>
                    {renderModal()}
                </div>
            </div>
        </>)
}