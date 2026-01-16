import { useStore } from "@/hooks/useStore"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { GetAllDoulaReview } from "../api/api"
import type { DoulaReviewBaseForm } from "../schema/DoulaReviewSchema"

export const useDoulaReviewQuery = (f_doulaId?: string) => {
    const { pageIndex, pageSize } = useStore()
    const query = useQuery<DoulaReviewBaseForm>({
        queryKey: ['reviews', pageIndex, f_doulaId, pageSize],
        queryFn: async () => {
            try {
                return await GetAllDoulaReview({
                    page: pageIndex + 1,
                    limit: pageSize,
                    f_doulaId,
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