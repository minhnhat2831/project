import { Icons } from "@/components/common/base/Icon"
import PopupCE from "@/components/common/base/PopupCE"
import Button from "@/components/common/form/Button"
import PhoneInput from "@/components/common/form/PhoneInput"
import SelectForm from "@/components/common/form/Select"
import { countryCodes } from "@/constants/countryCode"
import { useModalStore } from "@/hooks/useModalStore"
import { toast } from "react-toastify"
import { UpdateDoula } from "../../api/api"
import { DoulaRequestSchema, type DoulaRequest } from "../../schema/DoulaSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDoulaStore } from "../../store/useSelectedDoula"
import { useDouleDetail } from "../../hooks/useDoulaDetail"
import { useRefetchData } from "@/hooks/useRefetch"
import { useEffect } from "react"
interface props {
    type: "create" | "edit"
}

export default function DoulaFormModal({ type }: props) {
    const { open, setOpen, typeMode } = useModalStore()
    const isEdit = typeMode === "edit"
    const { selectedDoula } = useDoulaStore()
    const { data : doulaDetail } = useDouleDetail(isEdit ? selectedDoula?.id : "")
    const { refetch } = useRefetchData()
    const { register, handleSubmit,reset, formState: { errors } } =
        useForm<DoulaRequest>({
            resolver: zodResolver(DoulaRequestSchema),
            defaultValues: doulaDetail
                ? {
                    user: {
                        phoneNumber: doulaDetail.user?.phoneNumber ?? "",
                        countryCode: doulaDetail.user?.countryCode ?? "",
                    },
                    status: doulaDetail.status
                }
                : {
                    user : {
                        phoneNumber : "",
                        countryCode : ""
                    },
                    status : ""
                }
        })
    
    useEffect(()=>{
        if(type === "edit" && doulaDetail){
            reset({
                user: {
                        phoneNumber: doulaDetail.user?.phoneNumber ?? "",
                        countryCode: doulaDetail.user?.countryCode ?? "",
                    },
                status: doulaDetail.status
            })
        }
    },[reset, type, doulaDetail])

    const onSubmit = async (data: DoulaRequest) => {
        try {
            if(!doulaDetail) return
            const response = await UpdateDoula(doulaDetail?.id, data);
            reset(data)
            toast.success(response?.message)
            refetch?.()
            setOpen(false);
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
                            {...register("user.countryCode")}
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
                                {...register("user.phoneNumber")}
                            />
                        </div>
                    </div>
                    <div className="px-4 text-red-500 text-sm mt-1">
                        {errors.user?.phoneNumber?.message}
                    </div>

                    <SelectForm
                        label="Status"
                        {...register("status")}
                        error={errors.status?.message}
                    >
                        <option value="" hidden>Selecte Status</option>
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