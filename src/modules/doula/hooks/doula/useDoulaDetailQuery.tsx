import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { DoulaDetail } from "../../schema/DoulaSchema"
import { GetDoulaDetail } from "../../api/api"

export const useDoulaDetailQuery = (id?: string) => {
    const query = useQuery<DoulaDetail>({
        queryKey: [`doulas`, id],
        queryFn: async () => {
            try {
                const result = await GetDoulaDetail(id)
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