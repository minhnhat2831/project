import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateCategory, DeleteCategory, EditCategory } from "../api/api"
import { toast } from "react-toastify"
import { type CategoryDelete, type CategoryRequest } from "../schema/CategorySchema"

export const useCategoryMutation = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: CreateCategory,
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })

    const editMutation = useMutation({
        mutationFn: ({ data, id }: { data: CategoryRequest; id: string }) =>
            EditCategory(id, data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({ data }: { data: CategoryDelete }) =>
            DeleteCategory(data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        }
    })

    return { createMutation, editMutation, deleteMutation }
}