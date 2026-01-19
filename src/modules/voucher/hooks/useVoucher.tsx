import { useStore } from "@/hooks/useStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import type { voucherDeleteRequest, voucherList, voucherListItem } from "../schema/VoucherSchema.type"
import { createVoucher, editVoucher, getAllVoucher, getVoucherDetail } from "../api/api"
import { toast } from "react-toastify"

export default function useVoucher() {
    
    const queryClient = useQueryClient()
    const useGetAllVoucher = () => {
        const { pageIndex, pageSize, search, sort } = useStore()
        const [debouncedSearch] = useDebounce(search, 500)

        const query = useQuery<voucherList>({
            queryKey: ['vouchers', pageIndex, pageSize, debouncedSearch, sort],
            queryFn: async () => {
                try {
                    return await getAllVoucher({
                        page: pageIndex + 1,
                        limit: pageSize,
                        search: debouncedSearch,
                        sort
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

    const useVoucherDetail = (id?: string) => {
        const query = useQuery<voucherListItem>({
            queryKey: ['vouchers', id],
            queryFn: async () => {
                try {
                    const result = await getVoucherDetail(id)
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

    const useCreateVoucher = useMutation({
        mutationFn: createVoucher,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["vouchers"] })
        }
    })

    const useEditVoucher = useMutation({
        mutationFn: ({ data, id }: { data: voucherDeleteRequest, id: string }) =>
            editVoucher(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['vouchers'] })
        }
    })

    return {
        useGetAllVoucher,
        useVoucherDetail,
        useCreateVoucher,
        useEditVoucher
    }
}