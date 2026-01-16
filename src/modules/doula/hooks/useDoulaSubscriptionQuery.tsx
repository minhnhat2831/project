import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { GetDoulaSubscriptionDetail } from "../api/api"
import type { DoulaSubcriptionBaseForm } from "../schema/DoulaSubcriptionSchema"

export const useDoulaSubscriptionQuery = (id?: string) => {
    const query = useQuery<DoulaSubcriptionBaseForm>({
        queryKey: ['doula-subscriptions', id],
        queryFn: async () => {
            try {
                const result = await GetDoulaSubscriptionDetail(id)
                return result
            } catch (err: any) {
                toast.error(`${err.response?.data?.message}`)
                throw err
            }
        },
        enabled: !!id,
    })

    return {
        data: query.data?.data,
        loading: query.isLoading,
    }
}