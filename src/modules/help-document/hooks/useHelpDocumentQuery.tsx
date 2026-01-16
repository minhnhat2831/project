import { useQuery } from "@tanstack/react-query"
import { GetAllHelpDocument } from "../api/api"
import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"
import { toast } from "react-toastify"
import { type HelpDocumentBaseForm } from "../schema/HelpDocumentSchema"

export const useHelpDocumentQuery = () => {
    const { pageIndex, pageSize, search, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 500)

    const query = useQuery<HelpDocumentBaseForm>({
        queryKey: ['help-documents', pageIndex, pageSize, debouncedSearch, sort],
        queryFn: async () => {
            try {
                return await GetAllHelpDocument({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: debouncedSearch,
                    sort
                })
            } catch (err: any) {
                toast.error(err.response?.data?.message)
                throw err
            }
        }
    })

    return {
        data: query.data?.data ?? [],
        loading: query.isLoading,
        metadata: query.data?.metadata
    }
}