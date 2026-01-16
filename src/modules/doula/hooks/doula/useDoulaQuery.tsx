import { useStore } from "@/hooks/useStore"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { toast } from "react-toastify"
import type { DoulaBaseForm } from "../../schema/DoulaSchema"
import { GetAllDoula } from "../../api/api"

export const useDoulaQuery = () => {
    const { pageIndex, pageSize, sort, search } = useStore()
    const [debouceSearch] = useDebounce(search, 500)
    const query = useQuery<DoulaBaseForm>({
        queryKey: ['doulas', pageIndex, pageSize, debouceSearch, sort],
        queryFn: async () => {
            try {
                return await GetAllDoula({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: debouceSearch,
                    sort,
                })
            } catch (error: any) {
                toast.error(error.response?.data?.message)
                throw error
            }
        }
    })
    return {
        data: query.data?.data ?? [],
        loading: query.isLoading,
        metadata: query.data?.metadata ?? null
    }
}