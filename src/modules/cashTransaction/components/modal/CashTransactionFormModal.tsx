import PopupForm from "../common/PopupForm";
import Button from "@/components/common/form/Button";
import { useModalCreateStore } from "../../store/useModalCreateStore";
import CashTransactionFormDetail from "./cashTransactionForm/CashTransactionFormDetail";
import CashTransactionFormDocument from "./cashTransactionForm/CashTransactionDocument";
import CashTransactionFormInternal from "./cashTransactionForm/CashTransactionInternal";
import { Icons } from "@/components/common/base/Icon";
import { FormProvider, useForm } from "react-hook-form";
import type { cashTransactionRequest } from "../../schema/Schema.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { cashTransactionRequestSchema } from "../../schema/Schema";

interface props {
    type?: "Debit" | "Credit"
}

export default function CashTransactionFormModal({ type }: props) {
    const { open, setOpen } = useModalCreateStore()
    const method = useForm<cashTransactionRequest>({
        resolver: zodResolver(cashTransactionRequestSchema),
        values  : {
            transactionType: "",
            orgNum: "",    //clientName
            subOrgNum: "", //Sub-Org Name
            currency: "",
            amount: 0,
            effectiveDo: new Date().toISOString().split("T")[0] ?? "",
            description: "",
            bankAccountUid: "",
            comments: "",
            files : [],
            createdDo: new Date().toISOString().split("T")[0],
        }
    })

    const onSubmit = (data: cashTransactionRequest) => {
        console.log("SUBMIT DATA:", data)
    }

    return (<>
        <PopupForm open={open} onOpenChange={setOpen}>
            <>
                <div className="w-full h-1/12 px-4 pt-2 flex justify-between items-center">
                    <h2 className="text-xl font-medium">Create Transaction - {type}</h2>
                    <Button variant="close" onClick={() => {
                        setOpen(false)
                        method.reset()
                    }
                    }><Icons.Close /></Button>
                </div>
                <div className="flex p-2 m-4 border rounded-sm bg-blue-100 px-4">
                    <Icons.Error className="text-blue-500 mr-1" /><p>This transaction is in <span className="font-bold">Draft</span> status. Please update the transaction details before submitting it to Checker. Once approved by Checker, the status will change to <span className="font-bold">Completed</span></p>
                </div>
                <FormProvider {...method} >
                    <form onSubmit={method.handleSubmit(onSubmit)} className="flex flex-col h-full overflow-auto">
                        <div className="py-6 px-2 h-6/9 flex-1 overflow-auto bg-gray-100">
                            {/* Transaction Details */}
                            <CashTransactionFormDetail type={type} />

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
                                onClick={() => setOpen(false)}>
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
                                type="submit"
                                variant="normal"
                                size="sm"
                                className="w-40 bg-red-500 text-white hover:bg-blue-400 overflow-hidden">
                                Save and Submit
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </>

        </PopupForm>
    </>)
}