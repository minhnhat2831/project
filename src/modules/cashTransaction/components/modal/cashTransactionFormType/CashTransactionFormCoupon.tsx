import DateInput from "@/components/common/form/DateTimeInput"
import InputForm from "@/components/common/form/InputForm"
import { useFormContext } from "react-hook-form"
import Select from "react-select"

export default function CashTransactionFormCoupon() {
    //console.log(type)
    //de debit - coupon
    const { control,  formState: { errors } } = useFormContext()
    return (<>
        <div className="flex py-5 items-center">
            <label className="mr-40 mt-1">ISIN</label>
            <Select
                className="w-55"
                isClearable
            ></Select>
        </div>
        <div className="flex py-5 items-center">
            <label className="mr-23 mt-1">Security Name</label>
            <p> - </p>
        </div>
        <div className="flex py-5 items-center">
            <label className="mr-5 mt-1">Coupon Payment Rate</label>
            <InputForm
                name="couponPayments.cashOrderAmt"
                control={control}
                type="number"
                error={errors?.couponPayments?.message}
            >
            </InputForm>
            <p>%</p>
        </div>
        <table>
            Table
        </table>
        <div className="flex py-5 items-center">
            <label className="mr-8 mt-1">Total Payment Amount</label>
            {<p> EUR 0.00 </p>}
        </div>
        <div className="flex py-5 items-center">
            <label className="mr-19 mt-1">Payment Date</label>
            <DateInput />
        </div>
        <div className="flex py-5 items-center">
            <label className="mr-24 mt-1">Description</label>
            <InputForm
                name="description"
                control={control}
                type="text"
                error={errors?.description?.message}
            >
            </InputForm>
        </div>
    </>)
}