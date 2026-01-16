import { useQuery } from "@tanstack/react-query"
import { GetAllCategory } from "../api/api"
import { type CategoryBaseForm } from "../schema/CategorySchema"
import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"
import { toast } from "react-toastify"

export const useCategoryQuery = () => {
    const { pageIndex, pageSize, search, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 500);
    const query = useQuery<CategoryBaseForm>({
        queryKey: ['categories', pageIndex, pageSize, debouncedSearch, sort],
        queryFn: async () => {
            try {
                return await GetAllCategory({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: debouncedSearch,
                    sort,
                })
            } catch (err: any) {
                toast.error(`${err.response?.data?.message}`)
                throw err
            }
        }
    })

    return {
        data: query.data?.data ?? [],
        loading: query.isLoading,
        metadata: query.data?.metadata ?? null,
    }
}