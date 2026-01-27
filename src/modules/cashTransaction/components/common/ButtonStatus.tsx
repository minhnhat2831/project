import Button from "@/components/common/form/Button";
import { useFormContext } from "react-hook-form";

export default function ButtonStatus() {
    const transactionStatus = [
        { status: 'Draft', style: "mr-2 bg-blue-500 shadow-xl" },
        { status: 'Pending', style: "mr-2 bg-orange-500 shadow-xl" },
        { status: 'Complete', style: "mr-2 bg-green-500 shadow-xl" },
    ]
    const { watch, setValue } = useFormContext()
    const watchStatus = watch("action")
    return (<>
        {transactionStatus.map((status, index) => (
            <Button
                key={index}
                variant="normal"
                type="button"
                size="sm"
                className={`${status.status === watchStatus ? status.style : "bg-gray-500 mr-2 hover:bg-gray-600 shadow-xl"}`}
                onClick={() => {
                    setValue("action", status.status)
                }}
            >
                {status.status}
            </Button>
        ))}
    </>)
}