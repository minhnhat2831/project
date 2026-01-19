import { useStore } from "@/hooks/useStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useDebounce } from "use-debounce"
import type { helpDocumentList, helpDocumentListItem, helpDocumentRequest } from "../schema/HelpDocumentSchema.type"
import { createHelpDocument, deleteHelpDocument, editHelpDocument, getAllHelpDocument, getHelpDocumentDetail } from "../api/api"
import { toast } from "react-toastify"

export default function useHelpDocument() {
    const queryClient = useQueryClient()

    const useGetAllHelpDocument = () => {
        const { pageIndex, pageSize, search, sort } = useStore()
        const [debouncedSearch] = useDebounce(search, 500)

        const query = useQuery<helpDocumentList>({
            queryKey: ['help-documents', pageIndex, pageSize, debouncedSearch, sort],
            queryFn: async () => {
                try {
                    return await getAllHelpDocument({
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

    const useHelpDocumentDetail = (id?: string) => {
        const query = useQuery<helpDocumentListItem>({
            queryKey: ['help-documents', id],
            queryFn: async () => {
                try {
                    const result = await getHelpDocumentDetail(id)
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

    const useCreateHelpDocument = useMutation({
        mutationFn: createHelpDocument,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["help-documents"] })
        }
    })

    const useEditHelpDocument = useMutation({
        mutationFn: ({ data, id }: { data: helpDocumentRequest, id: string }) =>
            editHelpDocument(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['help-documents'] })
        }
    })

    const useDeleteHelpDocument = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            deleteHelpDocument(id),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['help-documents'] })
        }
    })
    return {
        useGetAllHelpDocument,
        useHelpDocumentDetail,
        useCreateHelpDocument,
        useEditHelpDocument,
        useDeleteHelpDocument
    }
}