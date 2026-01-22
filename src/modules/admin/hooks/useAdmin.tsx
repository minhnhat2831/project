import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import type { adminListItem , adminList } from "../schema/AdminUserSchema.type"
import { getAdminDetail, getAllAdmin } from "../api/api"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAdmin, deleteAdmin, editAdmin } from "../api/api"
import type { adminFormEdit } from "../schema/AdminUserSchema.type"
import { useStore } from "@/hooks/useStore"
import { useQueryParams } from "@/hooks/useQueryParams"

export default function useAdmin() {
    const queryClient = useQueryClient()
    const useGetAllAdmin = () => {
        const { sort, pageIndex, pageSize} = useStore()
        const { handleSearchQuery } = useQueryParams()
        const { search } = handleSearchQuery()
        const [debouncedSearch] = useDebounce(search, 500)

        const query = useQuery<adminList>({
            queryKey: ["admins", pageIndex, pageSize, debouncedSearch, sort],
            queryFn: async () => {
                try {
                    return await getAllAdmin({
                        page: pageIndex + 1,
                        limit: pageSize,
                        search: debouncedSearch,
                        sort,
                    })
                } catch (err: any) {
                    toast.error(`${err.response?.data?.message}`)
                    throw err
                }
            },
        })

        return {
            data: query.data?.data ?? [],
            metadata: query.data?.metadata ?? null,
            loading: query.isLoading,
        }
    }

    const useAdminDetail = (id?: string) => {
        const query = useQuery<adminListItem>({
            queryKey: [`admins`, id],
            queryFn: async () => {
                try {
                    const result = await getAdminDetail(id)
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

    const useCreateAdmin = useMutation({
        mutationFn: createAdmin,
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
        },
    })

    const useEditAdmin = useMutation({
        mutationFn: ({ data, id }: { data: adminFormEdit, id: string }) =>
            editAdmin(data, id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
        },
    })

    const useDeleteAdmin = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteAdmin(id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
        },
    })

    return {
        useGetAllAdmin,
        useAdminDetail,
        useCreateAdmin,
        useEditAdmin,
        useDeleteAdmin
    }
}