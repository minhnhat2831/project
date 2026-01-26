import { Icons } from "@/components/common/base/Icon"
import PopupCE from "@/components/common/base/PopupCE"
import Button from "@/components/common/form/Button"
import InputField from "@/components/common/form/Input"
import SelectF from "@/components/common/form/Select"
import { useModalStore } from "@/hooks/useModalStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import useVoucher from "../../hooks/useVoucher"
import type { voucherRequest } from "../../schema/VoucherSchema.type"
import { voucherRequestScheme } from "../../schema/VoucherSchema"

interface props {
    type: "create" | "edit"
}

export default function VoucherFormModal({ type }: props) {
    const { open, setOpen } = useModalStore()
    const { useCreateVoucher } = useVoucher()
    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<voucherRequest>({
        resolver: zodResolver(voucherRequestScheme),
        values: {
            code: "",
            description: "",
            amount: 0,
            endDate: "",
            startDate: "",
            maxDiscountAmount: 0,
            minPayAmount: 0,
            quantityUse: 0,
            status: "active",
            type: ""
        }
    })

    const onSubmit = async (data: voucherRequest) => {
        try {
            if (type === 'create') {
                useCreateVoucher.mutate(data, {
                    onSuccess: () => {
                        reset()
                        setOpen(false)
                    },
                    onError: (err: any) => {
                        const message = err.response?.data?.message
                        if (message.toLowerCase().includes("code")) {
                            setError("code", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("description")) {
                            setError("description", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("start")) {
                            setError("startDate", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("end")) {
                            setError("endDate", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("quantityUse")) {
                            setError("quantityUse", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("amount")) {
                            setError("amount", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("type")) {
                            setError("type", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("minPayAmount")) {
                            setError("minPayAmount", {
                                type: "server",
                                message
                            })
                            return
                        }
                        if (message.toLowerCase().includes("maxDiscountAmount")) {
                            setError("maxDiscountAmount", {
                                type: "server",
                                message
                            })
                            return
                        }
                    }
                })
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message)

        }
    }
    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
                <p className="text-xl">Create Voucher</p>
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => {
                        setOpen(!open)
                        reset()
                    }}><Icons.Close />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-auto">
                <div className="py-2 px-2 h-6/9 flex-1 overflow-auto">
                    <InputField
                        label="Code"
                        variant="form"
                        inputSize="lg"
                        placeholder="Code"
                        {...register("code")}
                        error={errors.code?.message}>
                    </InputField>
                    <InputField
                        label="Description"
                        variant="form"
                        inputSize="lg"
                        placeholder="Description"
                        {...register("description")}
                        error={errors.description?.message}>
                    </InputField>
                    <div className="flex">
                        <InputField
                            label="Start Date"
                            variant="form"
                            inputSize="lg"
                            type="Date"
                            placeholder="Start Date"
                            {...register("startDate")}
                            error={errors.startDate?.message}>
                        </InputField>
                        <InputField
                            label="End Date"
                            variant="form"
                            inputSize="lg"
                            type="Date"
                            placeholder="End Date"
                            {...register("endDate")}
                            error={errors.endDate?.message}>
                        </InputField>
                    </div>

                    <InputField
                        label="Quantity "
                        variant="form"
                        inputSize="lg"
                        type="number"
                        placeholder="Quantity "
                        {...register("quantityUse")}
                        error={errors.quantityUse?.message}>
                    </InputField>

                    <SelectF label="Type of Coupon"
                        {...register("type", {
                            required: "This field is required"
                        })}
                        error={errors.type?.message}>
                        <option value="" hidden>Select Type</option>
                        <option value="percentage">Percentage</option>
                        <option value="fixed">Fixed</option>
                    </SelectF>

                    <InputField
                        label="Amount (%)"
                        variant="form"
                        inputSize="lg"
                        type="number"
                        placeholder="Amount"
                        {...register("amount")}
                        error={errors.amount?.message} >
                    </InputField>

                    <InputField
                        label="Condition"
                        variant="form"
                        inputSize="lg"
                        type="number"
                        placeholder="Condition"
                        {...register("minPayAmount")}
                        error={errors.minPayAmount?.message} >
                    </InputField>

                    <InputField
                        label="Condition max of discount"
                        variant="form"
                        inputSize="lg"
                        type="number"
                        placeholder="Condition max of discount"
                        {...register("maxDiscountAmount")}
                        error={errors.maxDiscountAmount?.message} >
                    </InputField>

                </div>
                <div className="px-6 py-4 mt-auto border-t bg-white">
                    <Button
                        type="submit"
                        variant="create">
                        Create
                    </Button>
                </div>
            </form>
        </PopupCE>
    </>)
}