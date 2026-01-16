import { useQuery } from "@tanstack/react-query"
import { GetAllPdSession } from "../api/api"
import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"
import { toast } from "react-toastify"
import type { PdBaseForm } from "../schema/PdSchema"

export const usePdQuery = () => {
    const { pageIndex, pageSize, search, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 500)
    const f_type = "pd"

    const query = useQuery<PdBaseForm>({
        queryKey: ['articles', pageIndex, pageSize, debouncedSearch, sort],
        queryFn: async () => {
            try {
                return await GetAllPdSession({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: debouncedSearch,
                    sort,
                    f_type
                })
            } catch (err: any) {
                toast.error(err.response?.data?.message)
                throw err
            }
        }
    })

    return {
        data: query.data?.data ?? [],
        loading: query.isLoading,
        metadata: query.data?.metadata
    }
}