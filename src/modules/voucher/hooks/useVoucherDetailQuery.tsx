import { useQuery } from "@tanstack/react-query"
import { GetVoucherDetail } from "../api/api"
import { toast } from "react-toastify"
import type { Voucher } from "../schema/VoucherSchema"

export const useVoucherDetailQuery = (id?: string) => {
    const query = useQuery<Voucher>({
        queryKey: ['vouchers', id],
        queryFn: async () => {
            try {
                const result = await GetVoucherDetail(id)
                return result.data
            } catch (err: any) {
                toast.error(err.response?.data?.message)
                throw err
            }
        },
        enabled: !!id
    })

    return {
        data: query.data,
        loading: query.isLoading
    }
}