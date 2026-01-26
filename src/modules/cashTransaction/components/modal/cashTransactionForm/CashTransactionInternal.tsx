import { Icons } from "@/components/common/base/Icon"
import TextArea from "@/components/common/form/TextArea"
import { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"

export default function CashTransactionFormInternal() {
    const [openForm, setOpenForm] = useState(true)
    const { control } = useFormContext()
    return (<>
        <div className={`bg-white rounded-sm mb-5 transition-all duration-500 ease-in-out shadow-xl ${openForm ? "h-80" : "h-12"}`}>
            <div
                className="w-full border-b h-12 px-4 flex items-center cursor-pointer"
                onClick={() => setOpenForm(!openForm)}
            >
                <p className="font-bold">Internal Comment</p>
                <div className="ml-auto transition-all duration-200">
                    {openForm ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
                </div>
            </div>

            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out
                         ${openForm ? "h-60 pt-4" : "h-0 p-0"}`}
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