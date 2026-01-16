import { useStore } from "@/hooks/useStore"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { GetAllCares } from "../api/api"
import { toast } from "react-toastify"
import { type CaresBaseForm } from "../schema/CaresSchema"

export const useCareQuery = (id?: string) => {
    const { pageIndex, pageSize, sort, search } = useStore()
    const [debouceSearch] = useDebounce(search, 500)

    const query = useQuery<CaresBaseForm>({
        queryKey: ['cares', pageIndex, id, pageSize, debouceSearch, sort],
        queryFn: async () => {
            try {
                return await GetAllCares({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: debouceSearch,
                    sort,
                    f_userId: id
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