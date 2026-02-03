import { Icons } from "@/components/common/base/Icon";
import { 
    TRANSACTION_CREDIT_ENUM, 
    TRANSACTION_DEBIT_ENUM, 
    transactionTypeCredit, 
    transactionTypeDebit 
} from "../../../constants/TransactionType";
import ButtonStatus from "../../common/ButtonStatus";
import { get, useFormContext } from "react-hook-form";
import CashTransactionFormDebit from "../cashTransactionFormType/CashTransactionFormDebit";
import SelectForm from "@/components/common/form/controllerForm/SelectForm";
import { useModalCreateStore } from "@/modules/cashTransaction/store/useModalCreateStore";
import { useOpenStoreStore } from "@/modules/cashTransaction/store/useopenFormStore";
import CashTransactionFormCoupon from "../cashTransactionFormType/CashTransactionFormCoupon";

export default function CashTransactionFormDetail() {
    const { open, setOpen } = useOpenStoreStore()
    const { control, watch, formState: { errors }, setValue, reset, clearErrors } = useFormContext()
    const { typeMode } = useModalCreateStore()
    const watchType = watch("data.transactionType")

    const renderModal = () => {
        if (watchType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT) {
            return <CashTransactionFormCoupon />
        } else if ((typeMode === "Debit" || typeMode === "Credit")
            && (watchType != "" && watchType != null)) {
            return <CashTransactionFormDebit transactionType={watchType} />
        }
    }

    function autoDescription(watchType : string | null){
        const isOther =
            watchType === TRANSACTION_DEBIT_ENUM.DEBIT_OTHER ||
            watchType === TRANSACTION_CREDIT_ENUM.CREDIT_OTHER;

        if (!isOther && watchType) {
            setValue("data.description", watchType)
        }else if(isOther){
            setValue("data.description", "")
        }

        if(watchType === null){
            reset()
        }
        clearErrors()
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
                        <label className="w-50 mt-1">Transaction Type<span className="text-red-500"> *</span></label>
                        <SelectForm
                            name="data.transactionType"
                            control={control}
                            options={typeMode === "Debit" ? transactionTypeDebit : transactionTypeCredit}
                            onValueChange={autoDescription}
                            error={get(errors, "data.transactionType.message")}
                        />
                    </div>
                    <div className="flex">
                        <label className="w-50 mt-1">Transaction Status</label>
                        <ButtonStatus />
                    </div>
                    {renderModal()}
                </div>
            </div>
        </>)
}