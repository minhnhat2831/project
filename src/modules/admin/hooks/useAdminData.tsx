import { useState, useEffect } from "react"
import type { Admin } from "../types/Admin"
import { getAdmins } from "../api/api"

export const useAdminData = () => {
    const [data, setData] = useState<Admin[]>([])
    const [loading, setLoading] = useState(false)

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(25)

    useEffect(() => {
        fetchAdmins()
    }, [page])

    const fetchAdmins = async () => {
        setLoading(true)
        const res = await getAdmins({
            page,
            limit,
        })
        setData(res.data)
        setLoading(false)
    }

    return { data, loading, setPage, setLimit, refetch : fetchAdmins }
}