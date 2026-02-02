import Button from "@/components/common/form/Button"
import { useFormContext } from "react-hook-form"
import { useModalCreateStore } from "../../store/useModalCreateStore"
import useTransactionForm from "../../hooks/useTransactionForm"
import { toast } from "react-toastify"
import { useModalConfirmStore } from "../../store/useModelConfirmStore"

export default function SubmitConfirm({ onBack, onSubmit }: { onBack: () => void, onSubmit: () => void }) {
    const { setOpen } = useModalCreateStore()
    const { setType } = useModalConfirmStore()
    const { getValues } = useFormContext()
    const { mapFormToPayload } = useTransactionForm()
    const data = getValues()
    const payload = mapFormToPayload(data)

    return (
        <div className="p-6 space-y-4 overflow-auto">
            <h3 className="text-lg font-semibold">Confirm Transaction</h3>

            <pre className="bg-gray-100 p-4 rounded text-sm">
                {JSON.stringify(payload, null, 2)}
            </pre>

            <div className="flex justify-end px-6 rounded-b-xl py-4 mt-auto border-t bg-white">
                <div className="flex justify-end gap-2">
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
                            console.log("SUBMIT DATA PAYLOAD:", payload)
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
