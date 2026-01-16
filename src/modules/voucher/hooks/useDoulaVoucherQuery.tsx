import { useQuery } from "@tanstack/react-query"
import { GetAllDoulaVoucher } from "../api/api"
import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"
import { toast } from "react-toastify"
import type { DoulaVoucherBaseForm } from "../schema/VoucherSchema"

export const useDoulaVoucherQuery = (id?: string) => {
    const { pageIndex, pageSize, search, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 500)

    const query = useQuery<DoulaVoucherBaseForm>({
        queryKey: ['doula-vouchers', pageIndex, id, pageSize, search, sort],
        queryFn: async () => {
            try {
                return await GetAllDoulaVoucher({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: debouncedSearch,
                    sort,
                    f_voucherId: id,
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