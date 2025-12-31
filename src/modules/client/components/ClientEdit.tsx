import InputField from "@/components/common/form/Input";
import type { Client } from "../types/client/Client";
import { useForm } from "react-hook-form";
import type { ClientEditRequest } from "../types/client/ClientEdit";
import { useRefetchData } from "@/hooks/useRefetch";
import { EditClient } from "../api/api";
import { toast } from "react-toastify";
import Select from "@/components/common/form/Select";
import Button from "@/components/common/form/Button";
import { useClientIdFetch } from "../hooks/useClientId";
import { Icons } from "@/components/common/Icon";

interface props {
    open: boolean
    setOpen: (open: boolean) => void,
    client: Client,
}

export default function ClientEdit({ open, setOpen, client }: props) {
    const { refetch } = useRefetchData()
    const { data } = useClientIdFetch(client.id)
    const { register, handleSubmit, formState: { errors } } =
        useForm<ClientEditRequest>({
            values: 
                {
                    phoneNumber: data?.phoneNumber,
                    countryCode: data?.countryCode,
                    status: data?.status
                }
        })

    const onSubmit = async (data: ClientEditRequest) => {
        try {
            const response = await EditClient(client.id,data)
            toast.success(response?.message)
            refetch?.()
            setOpen(false);
        }catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    }

    return (<>
        <div className="w-full border-b px-5 flex justify-between items-center h-1/12">
            <p className="text-xl">Update Client</p>
            <button className="font-bold rounded-full mr-2 cursor-pointer hover:bg-gray-200 w-6" onClick={() => setOpen(!open)}><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="h-6/9 flex-1">
                <label className="ml-4">PhoneNumber<span className="text-red-400"> *</span></label>
                <div className="flex">
                    <InputField
                        inputSize="sm"
                        {...register('countryCode')}
                    >
                    </InputField>
                    <InputField
                        inputSize="lg"
                        className="-ml-8 mr-80"
                        type="number"
                        {...register("phoneNumber")}                >
                    </InputField>
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