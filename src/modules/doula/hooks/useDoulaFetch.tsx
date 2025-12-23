import { useState, useEffect } from "react"
import type { AdminDoula, GetDoulaResponse } from "../types/adminDoula/AdminDoula"
import { GetAllDoula } from "../api/api"

export const useDouleFetch = (page: number, limit: number) => {
    const [data, setData] = useState<AdminDoula[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetDoulaResponse["metadata"] | null>(null)

    useEffect(() => {
        fetchDoula()
    }, [page, limit])

    const fetchDoula = async () => {
        setLoading(true)
        const res = await GetAllDoula({
            page,
            limit,
        })
        setData(res.data)
        setMetadata(res.metadata)
        setLoading(false)
    }

    return { data, loading, metadata, refetch: fetchDoula }
}