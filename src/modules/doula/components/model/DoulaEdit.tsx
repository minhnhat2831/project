import Select from "@/components/common/form/Select"
import Button from "@/components/common/form/Button"
import { useForm } from "react-hook-form"
import type { GetDoulaEditRequest } from "../../types/admin-doula/AdminDoulaEdit"
import { UpdateDoula } from "../../api/api"
import InputField from "@/components/common/form/Input"
import { toast } from "react-toastify"
import { Icons } from "@/components/common/Icon"
import { useDouleIdFetch } from "../../hooks/useDoulaId"
import type { AdminDoula } from "../../types/admin-doula/AdminDoula"
import { useRefetchData } from "@/hooks/useRefetch"

interface props {
    open: boolean
    setOpen: (open: boolean) => void,
    doula: AdminDoula,
}
export default function DoulaEdit({ open, setOpen, doula }: props) {
    const { data } = useDouleIdFetch(doula.id)
    const { refetch } = useRefetchData()
    const { register, handleSubmit, formState: { errors } } =
        useForm<GetDoulaEditRequest>({
            values: data
                ? {
                    user: {
                        phoneNumber: data.user?.phoneNumber ?? "",
                        countryCode: data.user?.countryCode ?? ""
                    },
                    status: data.status
                }
                : undefined
        })

    const onSubmit = async (data: GetDoulaEditRequest) => {
        try {
            const response = await UpdateDoula(doula.id, data);
            toast.success(response?.message)
            refetch?.()
            setOpen(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    };

    return (<>
        <div className="w-full border-b px-5 flex justify-between items-center h-1/12">
            <p className="text-xl">Update Doula</p>
            <button className="font-bold rounded-full mr-2 cursor-pointer hover:bg-gray-200 w-6" onClick={() => setOpen(!open)}><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="h-6/9 flex-1">
                <label className="ml-4">PhoneNumber<span className="text-red-400"> *</span></label>
                <div className="flex">
                    <InputField
                        inputSize="sm"
                        {...register("user.countryCode")}
                    >
                    </InputField>
                    <InputField
                        inputSize="lg"
                        className="-ml-8 mr-80"
                        type="number"
                        {...register("user.phoneNumber")}>
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