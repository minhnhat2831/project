import { useStore } from "@/hooks/useStore";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import type { ArticleBaseForm } from "../schema/ArticleScheme";
import { toast } from "react-toastify";
import { GetAllArticle } from "../api/api";

export default function useArticleQuery() {
    const { search, pageIndex, pageSize, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 500)

    const query = useQuery<ArticleBaseForm>({
        queryKey: ["articles", pageIndex, pageSize, debouncedSearch, sort],

        queryFn: async () => {
            try {
                return await GetAllArticle({
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