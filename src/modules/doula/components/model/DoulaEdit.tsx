import Select from "@/components/common/form/Select"
import Button from "@/components/common/form/Button"
import { useForm } from "react-hook-form"
import type { GetDoulaEditRequest } from "../../types/admin-doula/AdminDoulaEdit"
import { UpdateDoula } from "../../api/api"
import type { Doula } from "../../types/admin-doula/AdminDoulaId"
import InputField from "@/components/common/form/Input"

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
            await UpdateDoula(doula.id, data);
            if (onSuccess) onSuccess();
            setOpen(false);
        } catch (err) {
            console.error("Update failed", err);
        }
    };


    return (<>
        <div className="w-full border-b px-5 flex justify-between items-center h-15">
            <p className="text-xl">Update Doula</p>
            <button className="hover:bg-gray-200 font-bold rounded-l-lg w-5" onClick={() => setOpen(false)}>X</button>
        </div>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField 
                    label="PhoneNumber"
                    type="number"
                    {...register("user.phoneNumber")}                >
                    </InputField>
                </div>

                <div>
                    <Select
                        label="Status"
                        {...register("status")}
                        error={errors.status?.message}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </Select>

                </div>

                <div className="px-2 mt-8">
                    <Button>Update</Button>
                </div>
            </form>
        </div>
    </>)
}