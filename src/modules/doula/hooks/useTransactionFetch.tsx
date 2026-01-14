import { useState, useEffect } from "react"
import { GetTransaction } from "../api/api"
import { toast } from "react-toastify"
import type { Transaction, TransactionBaseForm } from "../schema/TransactionSchema"

export const useTransactionFetch = (page?: number, limit?: number, f_doulaId?: string) => {
    const [data, setData] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<TransactionBaseForm["metadata"] | null>(null)

    useEffect(() => {
        fetchDoula()
    }, [page, limit, f_doulaId])

    const fetchDoula = async () => {
        try {
            setLoading(true)
            const res = await GetTransaction({
                f_doulaId,
                page,
                limit,
            })
            setData(res.data)
            setMetadata(res.metadata)
            setLoading(false)
        } catch (err: any) {
            toast.error(err.response.data.message)
        }
    }

    return { data, loading, metadata, refetch: fetchDoula }
}