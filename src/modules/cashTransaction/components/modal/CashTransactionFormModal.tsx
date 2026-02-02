import PopupForm from "../common/PopupForm";
import Button from "@/components/common/form/Button";
import { useModalCreateStore } from "../../store/useModalCreateStore";
import CashTransactionFormDetail from "./cashTransactionForm/CashTransactionFormDetail";
import CashTransactionFormDocument from "./cashTransactionForm/CashTransactionDocument";
import CashTransactionFormInternal from "./cashTransactionForm/CashTransactionInternal";
import { Icons } from "@/components/common/base/Icon";
import { FormProvider } from "react-hook-form";
import useTransactionForm from "../../hooks/useTransactionForm";
import SubmitConfirm from "../common/SubmitComfirm";
import { useModalConfirmStore } from "../../store/useModelConfirmStore";

export default function CashTransactionFormModal() {
    const { open, setOpen, typeMode } = useModalCreateStore()
    const { type, setType } = useModalConfirmStore()
    const { method } = useTransactionForm()

    const onSubmit = () => {
        method.reset()
        setOpen(false)
    }

    return (<>
        <PopupForm open={open} onOpenChange={setOpen}>
            <>
                <div className="w-full h-1/12 px-4 pt-2 flex justify-between items-center">
                    <h2 className="text-xl font-medium">Create Transaction - {typeMode}</h2>
                    <Button variant="close" onClick={() => {
                        setType("form")
                        setOpen(false)
                        method.reset()
                    }
                    }><Icons.Close /></Button>
                </div>
                <div className="flex p-2 m-4 border rounded-sm bg-blue-100 px-4">
                    <Icons.Error className="text-blue-500 mr-1" /><p>This transaction is in
                        <span className="font-bold"> Draft</span> status.
                        Please update the transaction details before submitting it to Checker. Once approved by Checker, the status will change to
                        <span className="font-bold"> Completed</span></p>
                </div>
                <FormProvider {...method} >
                    {type === "form" && (
                        <form className="flex flex-col h-full overflow-auto">
                            <div className="py-6 px-2 h-6/9 flex-1 overflow-auto bg-gray-100">
                                {/* Transaction Details */}
                                <CashTransactionFormDetail />

                                {/* Document Attachment */}
                                <CashTransactionFormDocument />

                                {/* Internal Comments */}
                                <CashTransactionFormInternal />
                            </div>

                            <div className="flex justify-end px-6 rounded-b-xl py-4 mt-auto border-t bg-white">
                                <Button
                                    type="button"
                                    variant="normal"
                                    size="sm"
                                    className="w-30 mr-1 border hover:bg-gray-200 overflow-hidden"
                                    onClick={() => {
                                        setType("form")
                                        setOpen(false)
                                        method.reset()
                                    }}>
                                    Close
                                </Button>
                                <Button
                                    type="button"
                                    variant="normal"
                                    size="sm"
                                    className="w-40 mr-1 border text-red-500 hover:bg-gray-200 overflow-hidden">
                                    Save and Close
                                </Button>
                                <Button
                                    type="button"
                                    variant="normal"
                                    size="sm"
                                    onClick={method.handleSubmit(
                                        () => setType("confirm"),
                                        (errors) => console.log("SUBMIT ERROR:", errors)
                                    )}
                                    className="w-40 bg-red-500 text-white hover:bg-blue-400 overflow-hidden">
                                    Save and Submit
                                </Button>
                            </div>
                        </form>
                    )}

                    {type === "confirm" && (
                        <SubmitConfirm onBack={() => setType("form")} onSubmit={onSubmit} />
                    )}
                </FormProvider>
            </>
        </PopupForm >
    </>)
}