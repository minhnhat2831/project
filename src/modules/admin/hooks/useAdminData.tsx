import { useState, useEffect } from "react"
import type { Admin, GetAdminsResponse } from "../types/Admin"
import { GetAdmins } from "../api/api"
import { useStore } from "@/hooks/useStore"

export const useAdminData = () => {
    const [data, setData] = useState<Admin[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetAdminsResponse["metadata"] | null>(null)
    const { search, pageIndex, pageSize, sort } = useStore()

    useEffect(() => {
        fetchAdmins()
    }, [pageIndex, pageSize, search, sort])

    const fetchAdmins = async () => {
        setLoading(true)
        const res = await GetAdmins({
            page: pageIndex + 1,
            limit: pageSize,
            search,
            sort
        })
        setData(res.data)
        setMetadata(res.metadata)
        setLoading(false)
    }

    return { data, loading, metadata, refetch : fetchAdmins }
} 