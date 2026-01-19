import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"
import type { doulaPackageDetail, doulaPackageList } from "../schema/types/DoulaPackageSchema.type"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { getAllDoulaPackage, getDoulaPackageDetail } from "../api/api"

export default function useDoulaPackage() {
    const useGetAllDoulaPackage = (f_doulaId?: string) => {
        const { pageIndex, pageSize, sort, search } = useStore()
        const [debouceSearch] = useDebounce(search, 500)
        const query = useQuery<doulaPackageList>({
            queryKey: ['doula-packages', pageIndex, f_doulaId, pageSize, debouceSearch, sort],
            queryFn: async () => {
                try {
                    return await getAllDoulaPackage({
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

    const useDoulaPakageDetail = (id?: string) => {
        const query = useQuery<doulaPackageDetail>({
            queryKey: [`doula-packages`, id],
            queryFn: async () => {
                try {
                    const result = await getDoulaPackageDetail(id)
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
        }
    }

    return {
        useGetAllDoulaPackage,
        useDoulaPakageDetail
    }

}