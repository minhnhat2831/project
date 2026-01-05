import { useEffect, useState } from "react";
import { GetDoulaVoucher } from "../api/api";
import { useStore } from "@/hooks/useStore";
import { toast } from "react-toastify";
import type { DoulaVoucher, DoulaVoucherResponse } from "../types/DoulaVoucher";

export default function useDoulaVoucherData(id?: string) {
    const [data, setData] = useState<DoulaVoucher[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<DoulaVoucherResponse["metadata"] | null>(null)
    const { pageIndex, pageSize, search } = useStore()

    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, search, id])

    const fetchData = async () => {
        if (!id) return true
        try {
            setLoading(true)
            const response = await GetDoulaVoucher({
                page: pageIndex + 1,
                limit: pageSize,
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