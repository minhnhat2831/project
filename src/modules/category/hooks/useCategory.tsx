import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategory, deleteCategory, editCategory, getAllCategory, getCategoryDetail } from "../api/api"
import { toast } from "react-toastify"
import { type categoryDelete, type categoryList, type categoryRequest } from "../schema/CategorySchema.type"
import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"

export default function useCategory() {
    const queryClient = useQueryClient()

    const useGetAllCategory = () => {
        const { pageIndex, pageSize, search, sort } = useStore()
        const [debouncedSearch] = useDebounce(search, 500);
        const query = useQuery<categoryList>({
            queryKey: ['categories', pageIndex, pageSize, debouncedSearch, sort],
            queryFn: async () => {
                try {
                    return await getAllCategory({
                        page: pageIndex + 1,
                        limit: pageSize,
                        search: debouncedSearch,
                        sort,
                    })
                } catch (err: any) {
                    toast.error(`${err.response?.data?.message}`)
                    throw err
                }
            }
        })

        return {
            data: query.data?.data ?? [],
            loading: query.isLoading,
            metadata: query.data?.metadata ?? null,
        }
    }

    const useCategoryDetail = (id?: string) => {
        const query = useQuery({
            queryKey: ['categories', id],
            queryFn: async () => {
                try {
                    return await getCategoryDetail(id)
                } catch (error: any) {
                    toast.error(error)
                }
            },
            enabled: !!id
        })

        return {
            data: query.data?.data,
            loading: query.isLoading
        }
    }

    const useCreateCategory = useMutation({
        mutationFn: createCategory,
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })

    const useEditCategory = useMutation({
        mutationFn: ({ data, id }: { data: categoryRequest; id: string }) =>
            editCategory(id, data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })

    const useDeleteCategory = useMutation({
        mutationFn: ({ data }: { data: categoryDelete }) =>
            deleteCategory(data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })
    return {
        useGetAllCategory,
        useCategoryDetail,
        useCreateCategory,
        useEditCategory,
        useDeleteCategory
    }
}