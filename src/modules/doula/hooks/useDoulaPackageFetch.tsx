import { useState, useEffect } from "react"
import { GetDoulaPackage } from "../api/api"
import { toast } from "react-toastify"
import type { DoulaPackage, DoulaPackageBaseForm } from "../schema/DoulaPackageSchema"

export const useDoulaPackage = (page: number, limit: number, f_doulaId?: string) => {
    const [data, setData] = useState<DoulaPackage[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<DoulaPackageBaseForm["metadata"] | null>(null)

    useEffect(() => {
        fetchDoula()
    }, [page, limit, f_doulaId])

    const fetchDoula = async () => {
        try {
            setLoading(true)
            const res = await GetDoulaPackage({
                page,
                limit,
                f_doulaId,
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