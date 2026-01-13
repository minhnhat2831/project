import { useEffect, useState } from "react"
import type { SearchSetting, SearchSettingResponse } from "../types/SearchSetting"
import { useStore } from "@/hooks/useStore"
import { GetAllSetting } from "../api/api"
import { toast } from "react-toastify"
import { useDebounce } from "use-debounce"

export const useSearchSettingData = () => {
    const [data, setData] = useState<SearchSetting[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<SearchSettingResponse["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()
    const[debouncedSearch] = useDebounce(search, 1000)
    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, debouncedSearch, sort])

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await GetAllSetting({
                page: pageIndex + 1,
                limit: pageSize,
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
    return { data, loading, metadata, refetch: fetchData }
}