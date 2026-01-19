import { useStore } from "@/hooks/useStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import { deleteClient, editClient, getAllClient, getClientDetail } from "../api/api"
import { toast } from "react-toastify"
import type { clientList, clientListItem, clientRequest } from "../schema/ClientSchema.type"
export default function useClient() {
    const queryClient = useQueryClient()
    const useGetAllClient = () => {
        const { pageIndex, pageSize, sort, search } = useStore()
        const [debouceSearch] = useDebounce(search, 500)
        const embed = "address.fullAddress"
        const query = useQuery<clientList>({
            queryKey: ['users', pageIndex, pageSize, debouceSearch, sort],
            queryFn: async () => {
                try {
                    return await getAllClient({
                        page: pageIndex + 1,
                        limit: pageSize,
                        search: debouceSearch,
                        sort,
                        embed
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

    const useClientDetail = (id?: string) => {
        const query = useQuery<clientListItem>({
            queryKey: [`users`, id],
            queryFn: async () => {
                try {
                    const result = await getClientDetail(id)
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

    const useEditClient = useMutation({
        mutationFn: ({ data, id }: { data: clientRequest, id: string }) =>
            editClient(id, data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })

    const useDeleteClient = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteClient(id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })

    return {
        useGetAllClient,
        useClientDetail,
        useEditClient,
        useDeleteClient
    }
}