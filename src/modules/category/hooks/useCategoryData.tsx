import { useStore } from "@/hooks/useStore"
import { type Category, type GetCategoryList } from "../types/Category"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { GetAllCategory } from "../api/api"
import { useDebounce } from "use-debounce"

export const useCategoryData = () => {
    const [data, setData] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetCategoryList["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 1000)
    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, debouncedSearch, sort])

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await GetAllCategory({
                page: pageIndex + 1,
                limit: pageSize,
                search : debouncedSearch,
                sort
            })
            setData(response.data)
            setMetadata(response.metadata)
            setLoading(false)
        } catch (err: any) {
            toast.error(err.response.data.message)
        }
    }

    return { data, loading, metadata, refetch: fetchData }
}