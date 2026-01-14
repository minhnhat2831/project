import { useEffect, useState } from "react"
import { useStore } from "@/hooks/useStore"
import { GetAll } from "../api/api"
import { toast } from "react-toastify"
import { useDebounce } from "use-debounce"
import type { Article, ArticleBaseForm } from "../schema/ArticleScheme"

export const useArticleData = () => {
    const [data, setData] = useState<Article[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<ArticleBaseForm["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 500)
    const f_type = "article"
    useEffect(() => {
        fetchData()
    },[pageIndex, pageSize, debouncedSearch, sort ])

    const fetchData = async () => {
        try{
            if (loading) return 
            setLoading(true)
            const response = await GetAll({
                page : pageIndex + 1,
                limit : pageSize,
                search : debouncedSearch,
                sort,
                f_type
            })
            setData(response.data)
            setMetadata(response.metadata)
            setLoading(false)
        }catch(err : any){
            toast.error(err.response?.data?.message)
        }
    }

    return { data, loading, metadata, refetch : fetchData}
}