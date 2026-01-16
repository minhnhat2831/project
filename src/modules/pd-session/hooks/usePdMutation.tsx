import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreatePdSession, DeletePdSession, EditPdSession } from "../api/api"
import { toast } from "react-toastify"
import type { PdDelete, PdRequest } from "../schema/PdSchema"

export const usePdMutation = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: CreatePdSession,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["articles"] })
        }
    })

    const editMutation = useMutation({
        mutationFn: ({ data, id }: { data: PdRequest, id: string }) =>
            EditPdSession(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['articles'] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({ data }: { data: PdDelete }) =>
            DeletePdSession(data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['articles'] })
        }
    })

    return { createMutation, editMutation, deleteMutation }
}