import { useEffect, useState } from "react"
import type { Client, GetClientResponse } from "../types/Client"
import { GetAllClient } from "../api/api"

export const useClientFetch = (page: number, limit: number) => {
    const [data, setData] = useState<Client[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetClientResponse["metadata"] | null>(null)

    useEffect(() => {
        fetchClient()
    }, [page, limit])

    const fetchClient = async () => {
        setLoading(true)
        const res = await GetAllClient({
            page,
            limit,
        })
        setData(res.data)
        setMetadata(res.metadata)
        setLoading(false)
    }

    return { data, loading,metadata, refetch : fetchClient }
}