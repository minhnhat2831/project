import { useState, useEffect } from "react"
import { GetAllDoula } from "../api/api"
import { toast } from "react-toastify"
import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"
import type { Doula, DoulaBaseForm } from "../schema/DoulaSchema"

export const useDouleFetch = () => {
    const [data, setData] = useState<Doula[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<DoulaBaseForm["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()
    const [debouncedSearch] = useDebounce(search,1000)
    useEffect(() => {
        fetchDoula()
    }, [pageIndex, pageSize, debouncedSearch, sort])

    const fetchDoula = async () => {
        try {
            setLoading(true)
            const res = await GetAllDoula({
                page : pageIndex + 1,
                limit : pageSize,
                search : debouncedSearch,
                sort
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