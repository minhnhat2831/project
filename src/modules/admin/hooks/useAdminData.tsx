import { useState, useEffect } from "react"
import type { Admin, GetAdminsResponse } from "../types/Admin"
import { GetAdmins } from "../api/api"

export const useAdminData = (page?: number, limit?: number) => {
    const [data, setData] = useState<Admin[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetAdminsResponse["metadata"] | null>(null)

    useEffect(() => {
        fetchAdmins()
    }, [page, limit])

    const fetchAdmins = async () => {
        setLoading(true)
        const res = await GetAdmins({
            page,
            limit,
        })
        setData(res.data)
        setMetadata(res.metadata)
        setLoading(false)
    }

    return { data, loading,metadata, refetch : fetchAdmins }
} 