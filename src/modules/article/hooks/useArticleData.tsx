import { useEffect, useState } from "react"
import type { Article, ArticleResponse } from "../types/article/Article"
import { useStore } from "@/hooks/useStore"
import { GetAll } from "../api/api"
import { toast } from "react-toastify"

export const useArticleData = () => {
    const [data, setData] = useState<Article[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<ArticleResponse["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()
    const f_type = "article"
    useEffect(() => {
        fetchData()
    },[pageIndex, pageSize, search, sort])

    const fetchData = async () => {
        try{
            setLoading(true)
            const response = await GetAll({
                page : pageIndex + 1,
                limit : pageSize,
                search,
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