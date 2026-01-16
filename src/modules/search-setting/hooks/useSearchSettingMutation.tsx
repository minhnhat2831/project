import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateSearchSetting, DeleteSearchSetting, EditSearchSetting } from "../api/api"
import { toast } from "react-toastify"
import type { SearchSettingRequest } from "../schema/SearchSettingSchema"

export const useSearchSettingMutation = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: CreateSearchSetting,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["trending-keywords"] })
        }
    })

    const editMutation = useMutation({
        mutationFn: ({ data, id }: { data: SearchSettingRequest, id: string }) =>
            EditSearchSetting(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['trending-keywords'] })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            DeleteSearchSetting(id),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['trending-keywords'] })
        }
    })

    return { createMutation, editMutation, deleteMutation }
}