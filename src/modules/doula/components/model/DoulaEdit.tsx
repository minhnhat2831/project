import Select from "@/components/common/form/Select"
import Button from "@/components/common/form/Button"
import { useForm } from "react-hook-form"
import type { GetDoulaEditRequest } from "../../types/admin-doula/AdminDoulaEdit"
import { UpdateDoula } from "../../api/api"
import type { Doula } from "../../types/admin-doula/AdminDoulaId"
import InputField from "@/components/common/form/Input"
import { toast } from "react-toastify"
import { Icons } from "@/components/common/Icon"

interface props {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    doula: Doula,
    onSuccess?: () => void
}
export default function DoulaEdit({ open, setOpen, doula, onSuccess }: props) {
    const { register, handleSubmit, formState: { errors } } = useForm<GetDoulaEditRequest>({
        defaultValues: {
            user: {
                phoneNumber: doula.user.phoneNumber,
                countryCode: doula.user.countryCode,
            },
            status: doula.status,
        }
    })

    const onSubmit = async (data: GetDoulaEditRequest) => {
        try {
            const response = await UpdateDoula(doula.id, data);
            toast.success(response?.message)
            onSuccess?.()
            setOpen(false);
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        }
    };

    return (<>
        <div className="w-full border-b px-5 flex justify-between items-center h-1/12">
            <p className="text-xl">Update Doula</p>
            <button className="font-bold rounded-full mr-2 cursor-pointer hover:bg-gray-200 w-6" onClick={() => setOpen(false)}><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="h-6/9 flex-1">
                <InputField
                    inputSize="lg"
                    label="PhoneNumber"
                    type="number"
                    {...register("user.phoneNumber")}                >
                </InputField>

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