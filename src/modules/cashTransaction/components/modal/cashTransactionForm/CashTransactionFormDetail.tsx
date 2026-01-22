import { useState } from "react";
import { Icons } from "@/components/common/base/Icon";
import { transactionTypeCredit, transactionTypeDebit } from "../../../constants/TransactionType";
import ButtonStatus from "../../common/ButtonStatus";
import CashTransactionFormCredit from "../cashTransactionFormType/CashTransactionFormCredit";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import CashTransactionFormDebit from "../cashTransactionFormType/CashTransactionFormDebit";

interface props {
    type?: "Debit" | "Credit"
}

export default function CashTransactionFormDetail({ type }: props) {
    const [openForm, setOpenForm] = useState(true)
    const { control, watch } = useFormContext()
    const watchType = watch("transactionType")

    const renderModal = () => {
        if (type === "Debit" && watchType) {
            return <CashTransactionFormDebit type="Debit" />
        } else if (type === "Credit") {
            return <CashTransactionFormCredit type="Credit" />
        }
    }

    return (
        <>
            <div className={`bg-white rounded-sm mb-5 transition-all duration-500 ease-in-out shadow-xl ${openForm
                ? (watchType ? "h-auto" : "h-50") : "h-12"}`}>
                <div
                    className="w-full border-b h-12 px-4 flex items-center cursor-pointer"
                    onClick={() => setOpenForm(!openForm)}
                >
                    <p className="font-bold">Transaction Details</p>
                    <div className="ml-auto transition-transform duration-500">
                        {openForm ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
                    </div>
                </div>

                <div
                    className={`overflow-hidden px-4 transition-all duration-300 ease-in-out
                         ${openForm ? (watchType ? "h-auto pt-4" : "h-100 pt-2") : "h-0 pt-0"}`}
                >
                    <div className="flex mb-4 py-2">
                        <label className="mr-4 mt-1">Transaction Type<span className="text-red-500"> *</span></label>
                        <Controller
                            name="transactionType"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    isClearable
                                    options={type === "Debit" ? transactionTypeDebit : transactionTypeCredit}
                                    value={
                                        watchType
                                            ? { value: watchType, label: watchType }
                                            : null
                                    }
                                    onChange={(option) => {
                                        field.onChange(option?.value ?? null)
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="flex">
                        <label className="mr-4 mt-1">Transaction Status</label>
                        <ButtonStatus />
                    </div>
                    {renderModal()}
                </div>
            </div>
        </>)
}