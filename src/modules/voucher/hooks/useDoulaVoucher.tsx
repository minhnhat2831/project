import { useQuery } from "@tanstack/react-query"
import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"
import { toast } from "react-toastify"
import { getAllDoulaVoucher } from "../api/api"
import type { voucherDoulaList } from "../schema/VoucherSchema.type"

export const useDoulaVoucher = (id?: string) => {
    const { pageIndex, pageSize, search, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 500)

    const query = useQuery<voucherDoulaList>({
        queryKey: ['doula-vouchers', pageIndex, id, pageSize, search, sort],
        queryFn: async () => {
            try {
                return await getAllDoulaVoucher({
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