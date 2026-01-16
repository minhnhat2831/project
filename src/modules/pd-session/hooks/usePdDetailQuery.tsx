import { useQuery } from "@tanstack/react-query"
import { GetPdSessionDetail } from "../api/api"
import { toast } from "react-toastify"
import type { Pd } from "../schema/PdSchema"

export const usePdDetailQuery = (id?: string) => {
    const query = useQuery<Pd>({
        queryKey: ['articles', id],
        queryFn: async () => {
            try {
                const result = await GetPdSessionDetail(id)
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