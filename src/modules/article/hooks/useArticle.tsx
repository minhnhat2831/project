import { useStore } from "@/hooks/useStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import type { articleDelete, articleList, articleListItem, articleRequest } from "../schema/ArticleScheme.type"
import { createArticle, deleteArticle, editArticle, getAllArticle, getArticleDetail } from "../api/api"
import { toast } from "react-toastify"

export default function useArticle() {
    const queryClient = useQueryClient()

    const useGetAllArticle = () => {
        const { search, pageIndex, pageSize, sort } = useStore()
        const [debouncedSearch] = useDebounce(search, 500)

        const query = useQuery<articleList>({
            queryKey: ["articles", pageIndex, pageSize, debouncedSearch, sort],

            queryFn: async () => {
                try {
                    return await getAllArticle({
                        page: pageIndex + 1,
                        limit: pageSize,
                        search: debouncedSearch,
                        sort,
                    })
                } catch (err: any) {
                    toast.error(`${err.response?.data?.message}`)
                    throw err
                }
            },
        })

        return {
            data: query.data?.data ?? [],
            metadata: query.data?.metadata ?? null,
            loading: query.isLoading,
        }
    }

    const useArticleDetail= (id?: string) => {
        const query = useQuery<articleListItem>({
            queryKey: ['articles', id],
            queryFn: async () => {
                try {
                    const result = await getArticleDetail(id)
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

    const useCreateArticle = useMutation({
        mutationFn: createArticle,
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["articles"] })
        },
    })

    const useEditArticle = useMutation({
        mutationFn: ({ data, id }: { data: articleRequest; id: string }) =>
            editArticle(data, id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["articles"] })
        },
    })

    const useDeleteArticle = useMutation({
        mutationFn: ({ data }: { data: articleDelete }) =>
            deleteArticle(data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["articles"] })
        },
    })

    return {
        useGetAllArticle,
        useCreateArticle,
        useArticleDetail,
        useEditArticle,
        useDeleteArticle
    }
}