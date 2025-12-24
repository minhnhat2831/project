import { useEffect, useState } from "react"
import type { DoulaReview, DoulaReviewResponse } from "../types/doula-review/DoulaReview"
import { GetDoulaReview } from "../api/api"

export const useDoulaReview = (page: number, limit: number, f_doulaId?: string) => {
    const [data, setData] = useState<DoulaReview[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<DoulaReviewResponse["metadata"] | null>(null)

    useEffect(() => {
        fetchData()
    }, [page, limit, f_doulaId])

    const fetchData = async () => {
        setLoading(true)
        const response = await GetDoulaReview({
            page,
            limit,
            f_doulaId
        })
        setData(response.data)
        setLoading(false)
        setMetadata(response.metadata)
    }
    return { data, loading, metadata, refetch: fetchData }
}