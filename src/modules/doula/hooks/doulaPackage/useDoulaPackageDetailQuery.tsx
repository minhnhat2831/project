import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { DoulaPackageDetail } from "../../schema/DoulaPackageSchema"
import { GetDoulaPackageDetail } from "../../api/api"

export const useDoulaPakageDetailQuery = (id?: string) => {
    const query = useQuery<DoulaPackageDetail>({
        queryKey: [`doula-packages`, id],
        queryFn: async () => {
            try {
                const result = await GetDoulaPackageDetail(id)
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