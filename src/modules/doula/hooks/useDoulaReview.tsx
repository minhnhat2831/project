import { useEffect, useState } from "react"
import { GetDoulaReview } from "../api/api"
import { toast } from "react-toastify"
import type { DoulaReview, DoulaReviewBaseForm } from "../schema/DoulaReviewSchema"

export const useDoulaReview = (page: number, limit: number, f_doulaId?: string) => {
    const [data, setData] = useState<DoulaReview[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<DoulaReviewBaseForm["metadata"] | null>(null)

    useEffect(() => {
        fetchData()
    }, [page, limit, f_doulaId])

    const fetchData = async () => {
        try{
            setLoading(true)
        const response = await GetDoulaReview({
            page,
            limit,
            f_doulaId
        })
        setData(response.data)
        setLoading(false)
        setMetadata(response.metadata)
        }catch(err : any){
            toast.error(err.response.data.message)
        }
        
    }
    return { data, loading, metadata, refetch: fetchData }
}