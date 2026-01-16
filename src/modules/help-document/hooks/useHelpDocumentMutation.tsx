import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateHelpDocument, DeleteHelpDocument, EditHelpDocument } from "../api/api"
import { toast } from "react-toastify"
import { type HelpDocumentRequest } from "../schema/HelpDocumentSchema"

export const useHelpDocumentMutation = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: CreateHelpDocument,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["help-documents"] })
        }
    })

    const editMutation = useMutation({
        mutationFn: ({ data, id }: { data: HelpDocumentRequest, id: string }) =>
            EditHelpDocument(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['help-documents'] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            DeleteHelpDocument(id),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['help-documents'] })
        }
    })

    return { createMutation, editMutation, deleteMutation }
}