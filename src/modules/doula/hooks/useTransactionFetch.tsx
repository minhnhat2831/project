import { useState, useEffect } from "react"
import type { GetTransactions, Transaction } from "../types/transactions/Transactions"
import { GetTransaction } from "../api/api"

export const useTransactionFetch = ( page?: number, limit?: number, f_doulaId?: string) => {
    const [data, setData] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetTransactions["metadata"] | null>(null)

    useEffect(() => {
        fetchDoula()
    }, [page, limit, f_doulaId])

    const fetchDoula = async () => {
        setLoading(true)
        const res = await GetTransaction({
            f_doulaId,
            page,
            limit,
        })
        setData(res.data)
        setMetadata(res.metadata)
        setLoading(false)
    }

    return { data, loading, metadata, refetch: fetchDoula }
}