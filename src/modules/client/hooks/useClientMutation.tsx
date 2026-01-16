import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { DeleteClient, EditClient } from "../api/api"
import type { ClientRequest } from "../schema/ClientSchema"

export const useClientMutation = () => {
    const queryClient = useQueryClient()

    const editMutation = useMutation({
        mutationFn: ({ data, id }: { data: ClientRequest, id: string }) =>
            EditClient(id, data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            DeleteClient(id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["users"] })
        },
    })

    return { editMutation, deleteMutation }
}
