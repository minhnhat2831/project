import { useState, useEffect } from "react"
import type { DoulaPackage, DoulaPackageResponse } from "../types/doula-package/DoulaPackage"
import { GetDoulaPackage } from "../api/api"
import { toast } from "react-toastify"

export const useDoulaPackage = (page: number, limit: number, f_doulaId?: string) => {
    const [data, setData] = useState<DoulaPackage[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<DoulaPackageResponse["metadata"] | null>(null)

    useEffect(() => {
        fetchDoula()
    }, [page, limit, f_doulaId,])

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