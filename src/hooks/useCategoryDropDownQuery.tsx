import { useQuery } from "@tanstack/react-query"
import { useStore } from "@/hooks/useStore"
import { toast } from "react-toastify"
import { getAllCategory } from "@/modules/category/api/api"
import type { categoryList } from "@/modules/category/schema/CategorySchema.type"

export const useCategoryDropDownQuery = () => {
    const { pageIndex, pageSize } = useStore()
    const query = useQuery<categoryList>({
        queryKey: ['categories', pageIndex, pageSize],
        queryFn: async () => {
            try {
                return await getAllCategory({
                    page: 1,
                    limit: 100
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
    }
}