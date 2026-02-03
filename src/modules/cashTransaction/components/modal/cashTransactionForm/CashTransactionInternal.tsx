import { Icons } from "@/components/common/base/Icon"
import TextArea from "@/components/common/form/baseForm/TextArea"
import { useOpenStoreStore } from "@/modules/cashTransaction/store/useopenFormStore"
import { Controller, useFormContext } from "react-hook-form"

export default function CashTransactionFormInternal() {
    const { open, setOpen } = useOpenStoreStore()
    const { control } = useFormContext()
    return (<>
        <div className={`bg-white rounded-sm mb-5 transition-all duration-500 ease-in-out shadow-xl ${open ? "h-auto" : "h-12"}`}>
            <div
                className="w-full border-b h-12 px-4 flex items-center cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <p className="font-bold">Internal Comment</p>
                <div className="ml-auto transition-all duration-200">
                    {open ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                         ${open ? "h-auto pt-4 pb-5" : "h-0 p-0"}`}
            >
                <Controller
                    name="data.comments"
                    control={control}
                    render={({ field }) => (
                        <TextArea placeholder="Comment here..." {...field}>
                        </TextArea>
                    )}
                />
                <p className="px-4">Please note the text will be automatically saved once the request <span className="font-bold">approved</span> or <span className="font-bold">reject</span></p>
            </div>
        </div>

    </>)
}