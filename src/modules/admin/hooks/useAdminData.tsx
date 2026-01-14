import { useState, useEffect } from "react"
import { GetAdmins } from "../api/api"
import { useStore } from "@/hooks/useStore"
import { toast } from "react-toastify"
import { useDebounce } from "use-debounce";
import type { Admin, AdminUserBaseForm } from "../schema/AdminUserSchema"

export const useAdminData = () => {
    const [data, setData] = useState<Admin[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<AdminUserBaseForm["metadata"] | null>(null)
    const { search, pageIndex, pageSize, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 500)

    useEffect(() => {
        fetchAdmins()
    }, [pageIndex, pageSize, debouncedSearch, sort])

    const fetchAdmins = async () => {
        try {
            if (loading) return
            setLoading(true)
            const res = await GetAdmins({
                page: pageIndex + 1,
                limit: pageSize,
                search: debouncedSearch,
                sort
            })
            setData(res.data)
            setMetadata(res.metadata)
            setLoading(false)
        } catch (err: any) {
            toast.error(`status : ${err.response?.data?.status} - ${err.response?.data?.message}`)
            setLoading(false)
        }

    }

    return { data, loading, metadata, refetch: fetchAdmins }
} 