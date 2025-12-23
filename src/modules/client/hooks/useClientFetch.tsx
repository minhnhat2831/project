import { useEffect, useState } from "react"
import type { Client, GetClientResponse } from "../types/Client"
import { GetAllClient } from "../api/api"

export const useClientFetch = (page: number, limit: number, search? : string) => {
    const [data, setData] = useState<Client[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetClientResponse["metadata"] | null>(null)

    useEffect(() => {
        fetchClient()
    }, [page, limit,search])

    const fetchClient = async () => {
        setLoading(true)
        const res = await GetAllClient({
            page,
            limit,
            search
        })
        setData(res.data)
        setMetadata(res.metadata)
        setLoading(false)
    }

    return { data, loading,metadata, refetch : fetchClient }
}