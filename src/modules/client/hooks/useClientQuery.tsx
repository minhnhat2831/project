import { useStore } from "@/hooks/useStore"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { GetAllClient } from "../api/api"
import { toast } from "react-toastify"
import type { ClientBaseForm } from "../schema/ClientSchema"

export const useClientQuery = () => {
    const { pageIndex, pageSize, sort, search } = useStore()
    const [debouceSearch] = useDebounce(search, 500)
    const embed = "address.fullAddress"
    const query = useQuery<ClientBaseForm>({
        queryKey: ['users', pageIndex, pageSize, debouceSearch, sort],
        queryFn: async () => {
            try {
                return await GetAllClient({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: debouceSearch,
                    sort,
                    embed
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