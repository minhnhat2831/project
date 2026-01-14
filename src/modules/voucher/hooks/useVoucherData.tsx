import { useEffect, useState } from "react";
import { GetAllVoucher } from "../api/api";
import { useStore } from "@/hooks/useStore";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import type { Voucher, VoucherBaseForm } from "../schema/VoucherSchema";

export const useVoucherData = () => {
    const [data, setData] = useState<Voucher[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<VoucherBaseForm["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()
    const[debouncedSearch] = useDebounce(search, 1000)
    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, debouncedSearch, sort])

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await GetAllVoucher({
                page: pageIndex + 1,
                limit: pageSize,
                search : debouncedSearch,
                sort
            })
            setData(response.data)
            setMetadata(response.metadata)
            setLoading(false)
        } catch (err: any) {
            toast.error(err.response?.data?.message)
        }
    }

    return { data, loading, metadata, refetch: fetchData }
}