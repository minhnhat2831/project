import { useStore } from "@/hooks/useStore"
import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { toast } from "react-toastify"
import type { DoulaPackageBaseForm } from "../../schema/DoulaPackageSchema"
import { GetAllDoulaPackage } from "../../api/api"

export const useDoulaPackageQuery = (f_doulaId?: string) => {
    const { pageIndex, pageSize, sort, search } = useStore()
    const [debouceSearch] = useDebounce(search, 500)
    const query = useQuery<DoulaPackageBaseForm>({
        queryKey: ['doula-packages', pageIndex, f_doulaId, pageSize, debouceSearch, sort],
        queryFn: async () => {
            try {
                return await GetAllDoulaPackage({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: debouceSearch,
                    f_doulaId,
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