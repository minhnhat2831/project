import { useEffect, useState } from "react";
import type { GetVouchersResponse, Voucher } from "../types/Voucher";
import { GetAllVoucher } from "../api/api";
import { useStore } from "@/hooks/useStore";
import { toast } from "react-toastify";

export const useVoucherData = () => {
    const [data, setData] = useState<Voucher[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetVouchersResponse["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()

    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, search, sort])

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await GetAllVoucher({
                page: pageIndex + 1,
                limit: pageSize,
                search,
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