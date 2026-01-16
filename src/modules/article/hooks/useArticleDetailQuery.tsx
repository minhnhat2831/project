import { useQuery } from "@tanstack/react-query"
import { type Article } from "../schema/ArticleScheme"
import { GetArticleDetail } from "../api/api"
import { toast } from "react-toastify"

export const useArticleDetailQuery = (id?: string) => {
    const query = useQuery<Article>({
        queryKey: ['articles', id],
        queryFn: async () => {
            try {
                const result = await GetArticleDetail(id)
                return result.data
            } catch (err: any) {
                toast.error(`${err.response?.data?.message}`)
                throw err
            }
        },
        enabled: !!id,
    })

    return {
        data: query.data,
        loading: query.isLoading,
        fetch: query.refetch
    }
}