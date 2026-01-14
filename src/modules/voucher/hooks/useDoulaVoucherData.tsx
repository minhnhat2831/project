import { useEffect, useState } from "react";
import { GetDoulaVoucher } from "../api/api";
import { useStore } from "@/hooks/useStore";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import type { VoucherDoula, VoucherDoulaBaseForm } from "../schema/VoucherSchema";

export default function useDoulaVoucherData(id?: string) {
    const [data, setData] = useState<VoucherDoula[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<VoucherDoulaBaseForm["metadata"] | null>(null)
    const { pageIndex, pageSize, search } = useStore()
    const[debouncedSearch] = useDebounce(search, 1000)
    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, debouncedSearch, id])

    const fetchData = async () => {
        if (!id) return true
        try {
            setLoading(true)
            const response = await GetDoulaVoucher({
                page: pageIndex + 1,
                limit: pageSize,
                search : debouncedSearch,
                f_voucherId: id,
            })
            setData(response.data)
            setMetadata(response.metadata)
            setLoading(false)
        } catch (err: any) {
            toast.error(err.response?.data?.message)
        }
    }

    return { data, loading, metadata }
}