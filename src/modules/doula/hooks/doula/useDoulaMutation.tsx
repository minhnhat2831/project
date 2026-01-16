import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { DeleteDoula, EditDoula } from "../../api/api"
import type { DoulaRequest } from "../../schema/DoulaSchema"

export const useDoulaMutation = () => {
    const queryClient = useQueryClient()

    const editMutation = useMutation({
        mutationFn: ({ data, id }: { data: DoulaRequest, id: string }) =>
            EditDoula(id, data),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["doulas"] })
        },
    })

    const deleteMutation = useMutation({
        mutationFn: ({ id }: { id?: string }) =>
            DeleteDoula(id),
        onSuccess: (res) => {
            toast.success(res.message)
            queryClient.invalidateQueries({ queryKey: ["doulas"] })
        },
    })

    return { editMutation, deleteMutation }
}
