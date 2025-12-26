import { useState, useEffect } from "react"
import type { AdminDoula, GetDoulaResponse } from "../types/admin-doula/AdminDoula"
import { GetAllDoula } from "../api/api"
import { toast } from "react-toastify"

export const useDouleFetch = (page: number, limit: number, search?: string) => {
    const [data, setData] = useState<AdminDoula[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetDoulaResponse["metadata"] | null>(null)

    useEffect(() => {
        fetchDoula()
    }, [page, limit, search])

    const fetchDoula = async () => {
        try {
            setLoading(true)
            const res = await GetAllDoula({
                page,
                limit,
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