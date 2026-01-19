import { useStore } from "@/hooks/useStore"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { toast } from "react-toastify"
import type { transactionList } from "../schema/types/TransactionSchema.type"
import { getAllTransaction } from "../api/api"

export const useTransactionQuery = (f_doulaId?: string) => {
    const { pageIndex, pageSize, sort, search } = useStore()
    const [debouceSearch] = useDebounce(search, 500)
    const query = useQuery<transactionList>({
        queryKey: ['transactions', pageIndex, pageSize, f_doulaId, debouceSearch, sort],
        queryFn: async () => {
            try {
                return await getAllTransaction({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: debouceSearch,
                    sort,
                    f_doulaId
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