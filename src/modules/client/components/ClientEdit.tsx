import type { Client } from "../types/client/Client";
import { useForm } from "react-hook-form";
import { useRefetchData } from "@/hooks/useRefetch";
import { EditClient } from "../api/api";
import { toast } from "react-toastify";
import Select from "@/components/common/form/Select";
import Button from "@/components/common/form/Button";
import { useClientIdFetch } from "../hooks/useClientId";
import { Icons } from "@/components/common/base/Icon";
import { ClientSchema, type ClientForm } from "../util/ClientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { countryCodes } from "@/constants/countryCode";
import PhoneInput from "@/components/common/form/PhoneInput";

interface props {
    open: boolean
    setOpen: (open: boolean) => void,
    client: Client,
}

export default function ClientEdit({ open, setOpen, client }: props) {
    const { refetch } = useRefetchData()
    const { data } = useClientIdFetch(client.id)
    const { register, handleSubmit, formState: { errors } } =
        useForm<ClientForm>({
            resolver: zodResolver(ClientSchema) as any,
            values: data ?
                {
                    phoneNumber: data?.phoneNumber ?? 0,
                    countryCode: data.countryCode ?? "",
                    status: data?.status ?? ""
                } : undefined
        })

    const onSubmit = async (data: ClientForm) => {
        try {
            const clientData = { ...(data as any) }
            const response = await EditClient(client.id, clientData)
            toast.success(response?.message)
            refetch?.()
            setOpen(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    return (<>
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
                    <Select
                        label=""
                        className="w-24 shrink-0"
                        {...register("countryCode")}
                    >
                        {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.code}
                            </option>
                        ))}
                    </Select>

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

                <Select
                    label="Status"
                    {...register("status")}
                    error={errors.status?.message}
                >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </Select>
            </div>
            <div className="px-6 py-4 mt-auto border-t bg-white">
                <Button>Update</Button>
            </div>
        </form>
    </>)
}