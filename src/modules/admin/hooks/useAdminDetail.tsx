import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { GetAdminId } from "../api/api"
import type { Admin } from "../schema/AdminUserSchema"

export const useAdminDetail = (id?: string) => {
    const [data, setData] = useState<Admin | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await GetAdminId(id)
                setData(res.data)
            } catch (err: any) {
                toast.error(err.response.data.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id])

    return { data, loading }
}
