import { useQuery } from "@tanstack/react-query"
import type { Admin } from "../schema/AdminUserSchema"
import { GetAdminDetail } from "../api/api"
import { toast } from "react-toastify"

export const useAdminDetailQuery = (id?: string) => {
    const query = useQuery<Admin>({
        queryKey: [`admins`, id],
        queryFn: async () => {
            try {
                const result = await GetAdminDetail(id)
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