import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateVoucher, EditVoucher } from "../api/api"
import { toast } from "react-toastify"
import type { VoucherEditStatus } from "../schema/VoucherSchema"

export const useVoucherMutation = () => {
    const queryClient = useQueryClient()

    const createMutation = useMutation({
        mutationFn: CreateVoucher,
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ["vouchers"] })
        }
    })

    const editMutation = useMutation({
        mutationFn: ({ data, id }: { data: VoucherEditStatus, id: string }) =>
            EditVoucher(id, data),
        onSuccess: (err) => {
            toast.success(err.message)
            queryClient.invalidateQueries({ queryKey: ['vouchers'] })
        }
    })

    return { createMutation, editMutation }
}