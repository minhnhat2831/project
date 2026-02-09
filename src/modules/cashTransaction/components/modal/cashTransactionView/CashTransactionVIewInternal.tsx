import { Icons } from "@/components/common/base/Icon"
import { useList } from "@/modules/cashTransaction/hooks/useListData"
import { useDataStore } from "@/modules/cashTransaction/store/useDataStore"
import { useOpenFormStore } from "@/modules/cashTransaction/store/useModalFormStore"
import ConfirmField from "../../common/ConfirmField"

export default function CashTransactionViewInternal() {
    const { open, setOpen } = useOpenFormStore()
    const { selectedData } = useDataStore()
    const { useGetListDetail } = useList()
    const { data } = useGetListDetail(selectedData?.transactionId)
    
    return (<>
        <div className={`bg-white rounded-sm mb-5 shadow-xl ${open ? "h-auto" : "h-12"}`}>
            <div
                className="flex items-center px-4 h-12 border-b cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <p className="font-bold">Internal Comment</p>
                <div className="ml-auto">
                    {open ? <Icons.ExpandLess /> : <Icons.ExpandMore />}
                </div>
            </div>

            <div className={`${open ? "h-auto p-4" : "h-0 p-0"} overflow-hidden px-4 transition-all duration-400 ease-in-out`}>
                <ConfirmField label='Comments' text={data?.data?.cashOrderData?.description || "-"} />
            </div>
        </div>
    </>)
}