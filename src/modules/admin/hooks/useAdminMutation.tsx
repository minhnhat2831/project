import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { CreateAdmin, DeleteAdmin, EditAdmin } from "../api/api"
import type { AdminFormEdit } from "../schema/AdminUserSchema"

export const useAdminMutation = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: CreateAdmin,
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
        },
    })

    const editMutation = useMutation({
        mutationFn: ({ data, id }: { data: AdminFormEdit, id: string }) =>
            EditAdmin(data, id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            DeleteAdmin(id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["admins"] })
        },
    })

    return { createMutation, editMutation, deleteMutation }
}
