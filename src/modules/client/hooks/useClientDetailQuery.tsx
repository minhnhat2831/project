import { useQuery } from "@tanstack/react-query"
import { GetClientDetail } from "../api/api"
import { toast } from "react-toastify"
import type { Client } from "../schema/ClientSchema"

export const useClientDetailQuery = (id?: string) => {
    const query = useQuery<Client>({
        queryKey: [`users`, id],
        queryFn: async () => {
            try {
                const result = await GetClientDetail(id)
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