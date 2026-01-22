import DateInput from "@/components/common/form/DateTimeInput"
import InputField from "@/components/common/form/Input"
import Select from "react-select"

export default function CashTransactionFormCredit({ type }: { type: "Debit" | "Credit" }) {
    return (<>
        <div className="flex py-5 items-center">
            <label className="mr-28 mt-1">ISIN</label>
            <Select
                className="w-55"
                isClearable
            ></Select>
        </div>
        <div className="flex py-5 items-center">
            <label className="mr-14 mt-1">Security Name</label>
            <p> - </p>
        </div>
        <div className="flex py-5 items-center">
            <label className="mr-5 mt-1">Coupon Payment Rate</label>
            <InputField
                variant="form"
                inputSize="lg"
            ></InputField>
            <p>%</p>
        </div>
        <table>
            Table
        </table>
        <div className="flex py-5 items-center">
            <label className="mr-14 mt-1">Total Payment Amount</label>
            {<p> EUR 0.00 </p>}
        </div>
        <div className="flex py-5 items-center">
            <label className="mr-14 mt-1">Payment Date</label>
            <DateInput />
        </div>
        <div className="flex py-5 items-center">
            <label className="mr-14 mt-1">Description</label>
            <InputField
                inputSize="lg"
                variant="form"
            ></InputField>
        </div>
    </>)
}