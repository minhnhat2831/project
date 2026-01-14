import { Icons } from "@/components/common/base/Icon"
import PopupCE from "@/components/common/base/PopupCE"
import Button from "@/components/common/form/Button"
import PhoneInput from "@/components/common/form/PhoneInput"
import SelectForm from "@/components/common/form/Select"
import { countryCodes } from "@/constants/countryCode"
import { useRefetchData } from "@/hooks/useRefetch"
import { useClientStore } from "../store/useSeletedClient"
import { useClientDetail } from "../hooks/useClientDetail"
import { useModalStore } from "@/hooks/useModalStore"
import { useForm } from "react-hook-form"
import { ClientRequestSchema, type ClientRequest } from "../schema/ClientSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { EditClient } from "../api/api"
import { useEffect } from "react"

interface props {
    type: "create" | "edit"
}

export default function ClientFormModal({ type }: props) {
    const { refetch } = useRefetchData()
    const { open, setOpen, typeMode } = useModalStore()
    const { selectedClient } = useClientStore()
    const isEdit = typeMode === "edit"
    const { data: clientData } = useClientDetail(isEdit ? selectedClient?.id : "")
    const { register, handleSubmit,reset, formState: { errors } } =
        useForm<ClientRequest>({
            resolver: zodResolver(ClientRequestSchema),
            defaultValues: clientData ?
                {
                    phoneNumber: clientData?.phoneNumber ?? 0,
                    countryCode: clientData.countryCode ?? "",
                    status: clientData?.status ?? ""
                } : {
                    phoneNumber: 0,
                    countryCode: "",
                    status: ""
                }
        })

    useEffect(() => {
        if (type === "edit" && clientData) {
            reset({
                phoneNumber: clientData?.phoneNumber ?? 0,
                countryCode: clientData.countryCode ?? "",
                status: clientData?.status ?? ""
            });
        }
        if (type === "create") {
            reset({
                phoneNumber: 0,
                countryCode: "",
                status: ""
            })
        }
    }, [clientData, type, reset]);

    const onSubmit = async (data: ClientRequest) => {
        try {
            if (!clientData) return
            const response = await EditClient(clientData.id, data)
            reset(data)
            toast.success(response?.message)
            refetch?.()
            setOpen(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full border-b px-5 flex justify-between items-center h-1/12">
                <p className="text-xl">Update Client</p>
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => setOpen(!open)}><Icons.Close />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <div className="h-6/9 flex-1">
                    <label className="block mb-2 px-4">Phone Number<span className="text-red-500">*</span></label>
                    <div className="flex items-end">
                        <SelectForm
                            label=""
                            className="w-24 shrink-0"
                            {...register("countryCode")}
                        >
                            {countryCodes.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.code}
                                </option>
                            ))}
                        </SelectForm>

                        <div className="flex-1">
                            <PhoneInput
                                label=""
                                {...register("phoneNumber")}
                            />
                        </div>
                    </div>
                    <div className="px-4 text-red-500 text-sm mt-1">
                        {errors.phoneNumber?.message}
                    </div>

                    <SelectForm
                        label="Status"
                        {...register("status")}
                        error={errors.status?.message}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </SelectForm>
                </div>
                <div className="px-6 py-4 mt-auto border-t bg-white">
                    <Button>Update</Button>
                </div>
            </form>
        </PopupCE>
    </>)
}