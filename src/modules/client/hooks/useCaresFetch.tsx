import { toast } from "react-toastify"
import { useStore } from "@/hooks/useStore"
import { useEffect, useState } from "react"
import type { Cares, CaresBaseForm } from "../schema/CaresSchema"
import { GetCares } from "../api/api"

export const useCaresInfo = (id? : string) => {
    const [data, setData] = useState<Cares[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<CaresBaseForm["metadata"] | null>(null)
    const { pageIndex, pageSize, sort } = useStore()
    
    useEffect(() => {
        fetchCares()
    }, [pageIndex, pageSize, id, sort])

    const fetchCares = async () => {
        try {
            setLoading(true)
            const res = await GetCares({
                page : pageIndex + 1,
                limit : pageSize,
                f_userId : id,
                sort
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