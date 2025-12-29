import { useState, useEffect } from "react"
import type { AdminDoula, GetDoulaResponse } from "../types/admin-doula/AdminDoula"
import { GetAllDoula } from "../api/api"
import { toast } from "react-toastify"
import { useStore } from "@/hooks/useStore"

export const useDouleFetch = () => {
    const [data, setData] = useState<AdminDoula[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetDoulaResponse["metadata"] | null>(null)
    const { pageIndex, pageSize, search } = useStore()
    
    useEffect(() => {
        fetchDoula()
    }, [pageIndex, pageSize, search])

    const fetchDoula = async () => {
        try {
            setLoading(true)
            const res = await GetAllDoula({
                page : pageIndex + 1,
                limit : pageSize,
                search
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