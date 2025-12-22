import { useState, useEffect } from "react"
import type { Doula, GetDoulaResponse } from "../types/Doula"
import { GetAllDoula } from "../api/api"

export const useDouleFetch = (page: number, limit: number) => {
    const [data, setData] = useState<Doula[]>([])
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