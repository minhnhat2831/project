import { toast } from "react-toastify"
import { useStore } from "@/hooks/useStore"
import type { Cares, GetAllCaresResponse } from "../types/cares/cares"
import { useEffect, useState } from "react"
import { GetCares } from "../api/api"

export const useCaresInfo = (id? : string) => {
    const [data, setData] = useState<Cares[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetAllCaresResponse["metadata"] | null>(null)
    const { pageIndex, pageSize } = useStore()
    
    useEffect(() => {
        fetchCares()
    }, [pageIndex, pageSize, id])

    const fetchCares = async () => {
        try {
            setLoading(true)
            const res = await GetCares({
                page : pageIndex + 1,
                limit : pageSize,
                f_userId : id,
            })
            setData(res.data)
            setMetadata(res.metadata)
            setLoading(false)
        } catch (err: any) {
            toast.error(err.response.data.message)
        }

    }
    return { data, loading, metadata, refetch: fetchCares }
}