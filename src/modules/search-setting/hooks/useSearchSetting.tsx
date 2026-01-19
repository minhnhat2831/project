import { useStore } from "@/hooks/useStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import type { searchSettingList, searchSettingRequest } from "../schema/SearchSettingSchema.type"
import { createSearchSetting, deleteSearchSetting, editSearchSetting, getAllSearchSetting } from "../api/api"
import { toast } from "react-toastify"

export default function useSearchSetting() {
    const queryClient = useQueryClient()

    const useGetAllSearchSetting = () => {
        const { pageIndex, pageSize, search, sort } = useStore()
        const [debouncedSearch] = useDebounce(search, 500)

        const query = useQuery<searchSettingList>({
            queryKey: ['trending-keywords', pageIndex, pageSize, debouncedSearch, sort],
            queryFn: async () => {
                try {
                    return await getAllSearchSetting({
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

    const useCreateSearchSetting = useMutation({
        mutationFn: createSearchSetting,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["trending-keywords"] })
        }
    })

    const useEditSearchSetting = useMutation({
        mutationFn: ({ data, id }: { data: searchSettingRequest, id: string }) =>
            editSearchSetting(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['trending-keywords'] })
        }
    })

    const useDeleteSearchSetting = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteSearchSetting(id),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['trending-keywords'] })
        }
    })

    return { 
        useGetAllSearchSetting,
        useCreateSearchSetting,
        useEditSearchSetting,
        useDeleteSearchSetting
    }
}