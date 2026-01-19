import { useStore } from "@/hooks/useStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import type { pdDelete, pdList, pdListItem, pdRequest } from "../schema/PdSchema.type"
import { createPdSession, deletePdSession, editPdSession, getAllPdSession, getPdSessionDetail } from "../api/api"
import { toast } from "react-toastify"

export default function usePdSession() {
    const queryClient = useQueryClient()
    const useGetAllPdSession = () => {
        const { pageIndex, pageSize, search, sort } = useStore()
        const [debouncedSearch] = useDebounce(search, 500)
        const f_type = "pd"

        const query = useQuery<pdList>({
            queryKey: ['articles', pageIndex, pageSize, debouncedSearch, sort],
            queryFn: async () => {
                try {
                    return await getAllPdSession({
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

    const usePdSessionDetail = (id?: string) => {
        const query = useQuery<pdListItem>({
            queryKey: ['articles', id],
            queryFn: async () => {
                try {
                    const result = await getPdSessionDetail(id)
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

    const useCreatePdSession = useMutation({
        mutationFn: createPdSession,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["articles"] })
        }
    })

    const useEditPdSession = useMutation({
        mutationFn: ({ data, id }: { data: pdRequest, id: string }) =>
            editPdSession(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['articles'] })
        }
    })

    const useDeletePdSession = useMutation({
        mutationFn: ({ data }: { data: pdDelete }) =>
            deletePdSession(data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['articles'] })
        }
    })

    return {
        useGetAllPdSession,
        usePdSessionDetail,
        useCreatePdSession,
        useEditPdSession,
        useDeletePdSession
    }

}