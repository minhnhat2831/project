import { useStore } from "@/hooks/useStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import type { doulaDetail, doulaList, doulaRequest } from "../schema/types/DoulaSchema.type"
import { deleteDoula, editDoula, getAllDoula, getDoulaDetail } from "../api/api"
import { toast } from "react-toastify"

export default function useDoula() {
    const queryClient = useQueryClient()
    const useGetAllDoula = () => {
        const { pageIndex, pageSize, sort, search } = useStore()
        const [debouceSearch] = useDebounce(search, 500)
        const query = useQuery<doulaList>({
            queryKey: ['doulas', pageIndex, pageSize, debouceSearch, sort],
            queryFn: async () => {
                try {
                    return await getAllDoula({
                        page: pageIndex + 1,
                        limit: pageSize,
                        search: debouceSearch,
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

    const useDoulaDetail = (id?: string) => {
        const query = useQuery<doulaDetail>({
            queryKey: [`doulas`, id],
            queryFn: async () => {
                try {
                    const result = await getDoulaDetail(id)
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

    const useEditDoula = useMutation({
        mutationFn: ({ data, id }: { data: doulaRequest, id: string }) =>
            editDoula(id, data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["doulas"] })
        },
    })

    const useDeleteDoula = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteDoula(id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["doulas"] })
        },
    })

    return {
        useGetAllDoula,
        useDoulaDetail,
        useEditDoula,
        useDeleteDoula
    }
}