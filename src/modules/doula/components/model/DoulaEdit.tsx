import Select from "@/components/common/form/Select"
import { countryCodes } from "@/constants/countryCode"
import Button from "@/components/common/form/Button"
import { useForm } from "react-hook-form"
import { UpdateDoula } from "../../api/api"
import { toast } from "react-toastify"
import { Icons } from "@/components/common/base/Icon"
import { useDouleIdFetch } from "../../hooks/useDoulaId"
import type { AdminDoula } from "../../types/admin-doula/AdminDoula"
import { useRefetchData } from "@/hooks/useRefetch"
import { DoulaSchema, type DoulaForm } from "../../util/DoulaSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import PhoneInput from "@/components/common/form/PhoneInput"

interface props {
    open: boolean
    setOpen: (open: boolean) => void,
    doula: AdminDoula,
}
export default function DoulaEdit({ open, setOpen, doula }: props) {
    const { data } = useDouleIdFetch(doula.id)
    const { refetch } = useRefetchData()
    const { register, handleSubmit, formState: { errors } } =
        useForm<DoulaForm>({
            resolver: zodResolver(DoulaSchema) as any,
            values: data
                ? {
                    user: {
                        phoneNumber: data.user?.phoneNumber ?? "",
                        countryCode: data.user?.countryCode ?? "",
                    },
                    status: data.status
                }
                : undefined
        })

    const onSubmit = async (data: DoulaForm) => {
        try {
            const doulaData = { ...(data as any) }
            const response = await UpdateDoula(doula.id, doulaData);
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
                        {...register("user.countryCode")}
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
                            {...register("user.phoneNumber")}
                        />
                    </div>
                </div>
                <div className="px-4 text-red-500 text-sm mt-1">
                    {errors.user?.phoneNumber?.message}
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