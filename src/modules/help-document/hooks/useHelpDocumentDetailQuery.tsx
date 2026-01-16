import { useQuery } from "@tanstack/react-query"
import { type HelpDocument } from "../schema/HelpDocumentSchema"
import { GetHelpDocumentDetail } from "../api/api"
import { toast } from "react-toastify"

export const useHelpDocumentDetailQuery = (id?: string) => {
    const query = useQuery<HelpDocument>({
        queryKey: ['help-documents', id],
        queryFn: async () => {
            try {
                const result = await GetHelpDocumentDetail(id)
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