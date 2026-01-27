import { Icons } from "@/components/common/base/Icon";
import { transactionTypeCredit, transactionTypeDebit } from "../../../constants/TransactionType";
import ButtonStatus from "../../common/ButtonStatus";
import CashTransactionFormCredit from "../cashTransactionFormType/CashTransactionFormCoupon";
import { get, useFormContext } from "react-hook-form";
import CashTransactionFormDebit from "../cashTransactionFormType/CashTransactionFormDebit";
import SelectForm from "@/components/common/form/SelectForm";
import { useModalCreateStore } from "@/modules/cashTransaction/store/useModalCreateStore";
import { useOpenStoreStore } from "@/modules/cashTransaction/store/useopenFormStore";

export default function CashTransactionFormDetail() {
    const { open, setOpen } = useOpenStoreStore()
    const { control, watch, formState: { errors }, setValue } = useFormContext()
    const { typeMode } = useModalCreateStore()
    const watchType = watch("data.transactionType")

    const renderModal = () => {
        if (typeMode === "Credit" && watchType == "Coupon Payment") {
            return <CashTransactionFormCredit />
        }else if ((typeMode === "Debit" || typeMode === "Credit") && (watchType != "" && watchType != null) ) {
            return <CashTransactionFormDebit transactionType={watchType} />
        } 
    }

    return (
        <>
            <div className={`bg-white rounded-sm mb-5 transition-all duration-600 ease-in-out shadow-xl 
            ${open ? (watchType ? "h-auto" : "h-50") : "h-12"}`}>
                <div
                    className="border-b h-12 px-4 flex items-center cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <p className="font-bold">Transaction Details</p>
                    <div className="ml-auto transition-all duration-500">
                        {open ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
                    </div>
                </div>

                <div
                    className={`overflow-hidden px-4 transition-all duration-400 ease-in-out
                         ${open ? (watchType ? "h-auto pt-4" : "h-100 pt-2") : "h-0 pt-0"}`}
                >
                    <div className="flex mb-4 py-2">
                        <label className="mr-16 mt-1">Transaction Type<span className="text-red-500"> *</span></label>
                        <SelectForm
                            name="data.transactionType"
                            control={control}
                            options={typeMode === "Debit" ? transactionTypeDebit : transactionTypeCredit}
                            onValueChange={(transactionType) => {
                                const isOther =
                                    transactionType === "Debit (Others)" ||
                                    transactionType === "Credit (Others)";

                                if (!isOther && transactionType) {
                                    setValue("data.description", transactionType)
                                }
                            }}
                            error={get(errors, "data.transactionType.message")}
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