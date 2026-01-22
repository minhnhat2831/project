import { Icons } from "@/components/common/base/Icon"
import PopupCE from "@/components/common/base/PopupCE"
import Button from "@/components/common/form/Button"
import PhoneInput from "@/components/common/form/PhoneInput"
import SelectForm from "@/components/common/form/SelectForm"
import { countryCodes } from "@/constants/countryCode"
import { useModalStore } from "@/hooks/useModalStore"
import { toast } from "react-toastify"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDoulaStore } from "../../store/useSelectedDoula"
import useDoula from "../../hooks/useDoula"
import type { doulaRequest } from "../../schema/types/DoulaSchema.type"
import { doulaRequestSchema } from "../../schema/schema/DoulaSchema"

interface props {
    type: "create" | "edit"
}

export default function DoulaFormModal({ type }: props) {
    const { open, setOpen } = useModalStore()
    const { selectedDoula } = useDoulaStore()
    const { useEditDoula, useDoulaDetail } = useDoula()
    const { data: doulaDetail } = useDoulaDetail(type === 'edit' ? selectedDoula?.id : "")
    const { register, handleSubmit,control, reset, formState: { errors } } =
        useForm<doulaRequest>({
            resolver: zodResolver(doulaRequestSchema),
            values: {
                user: {
                    phoneNumber: doulaDetail?.user?.phoneNumber ?? "",
                    countryCode: doulaDetail?.user?.countryCode ?? "",
                },
                status: doulaDetail?.status ?? ""
            }

        })

    const onSubmit = async (data: doulaRequest) => {
        try {
            if (!doulaDetail) return
            useEditDoula.mutate({ id: doulaDetail?.id, data: data }, {
                onSuccess: () => {
                    reset(data)
                    setOpen(false);
                }
            })
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    };

    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full border-b px-5 flex justify-between items-center h-1/12">
                <p className="text-xl">Update Doula</p>
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => {
                        setOpen(!open)
                        reset()
                    }}><Icons.Close />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <div className="h-6/9 flex-1">
                    <label className="block mb-2 px-4">Phone Number<span className="text-red-500">*</span></label>
                    <div className="flex items-end">
                        <div className="px-4 mb-4">
                            <select
                                className="w-20 shrink-0 bg-white border h-12 pl-2 rounded shadow-xl"
                                {...register("user.countryCode")}
                            >
                                {countryCodes.map((c) => (
                                    <option key={c.code} value={c.code}>
                                        {c.code}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <PhoneInput
                                label=""
                                {...register("user.phoneNumber")}
                            />
                        </div>
                    </div>
                    <div className="px-4 text-red-500 text-sm mt-1">
                        {errors.user?.phoneNumber?.message}
                    </div>

                    <Controller
                        control={control}
                        name="status"
                        render={({ field }) => (
                            <SelectForm
                                label="Status"
                                options={[
                                    { value: "active", label: "Active" },
                                    { value: "inactive", label: "Inactive" },
                                ]}
                                value={
                                    field.value
                                        ? { value: field.value, label: field.value }
                                        : null
                                }
                                onChange={(option) => field.onChange(option?.value)}
                                error={errors.status?.message}
                            />
                        )}
                    />
                </div>
                <div className="px-6 py-4 mt-auto border-t bg-white">
                    <Button>Update</Button>
                </div>
            </form>
        </PopupCE>
    </>)
}