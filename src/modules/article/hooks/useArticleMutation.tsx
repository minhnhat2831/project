import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { CreateArticle, DeleteArticle, EditArticle } from "../api/api"
import type { ArticleDelete, ArticleRequest } from "../schema/ArticleScheme"

export default function useArticleMutation() {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: CreateArticle,
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["articles"] })
        },
    })

    const editMutation = useMutation({
        mutationFn: ({ data, id }: { data: ArticleRequest; id: string }) =>
            EditArticle(data, id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["articles"] })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: ({ data }: { data: ArticleDelete }) =>
            DeleteArticle(data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["articles"] })
        },
    })

    return { createMutation, editMutation, deleteMutation }
}