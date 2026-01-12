import PopupCE from "@/components/common/base/PopupCE"
import { useModalStore } from "@/hooks/useModalStore"
import { useSettingStore } from "../store/useSeletedSetting"
import { SearchSettingScheme, type SearchSettingForm } from "../util/SearchSettingSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRefetchData } from "@/hooks/useRefetch"
import { toast } from "react-toastify"
import { CreateSetting, EditSetting } from "../api/api"
import Button from "@/components/common/form/Button"
import { Icons } from "@/components/common/base/Icon"
import InputField from "@/components/common/form/Input"
import { useEffect } from "react"

interface props {
    type: "create" | "edit"
}

export default function SearchSettingFormModal({ type }: props) {
    const { open, setOpen, typeMode } = useModalStore()
    const { selectedSearchSetting } = useSettingStore()
    const isEdit = typeMode === "edit"
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<SearchSettingForm>({
        resolver: zodResolver(SearchSettingScheme),
        defaultValues: isEdit ? {
            keyword: selectedSearchSetting?.keyword,
        } : {
            keyword: ""
        }
    })

    useEffect(() => {
        if (type === "create") {
            reset({
                keyword: ""
            })
        }
        if (type === "edit" && selectedSearchSetting) {
            reset({
                keyword: selectedSearchSetting.keyword
            })
        }
    }, [reset, type, selectedSearchSetting])
    const { refetch } = useRefetchData()
    const onSubmit = async (data: SearchSettingForm) => {
        try {
            if (isEdit) {
                if (!selectedSearchSetting) return
                const searchSettingData = { ...(data), count: 1, isSuggestion: true }
                const response = await EditSetting(selectedSearchSetting?.id, searchSettingData)
                toast.success(response?.message)
                reset(searchSettingData)
            } else {
                const searchSettingData = { ...(data), count: 1, isSuggestion: true }
                const response = await CreateSetting(searchSettingData)
                toast.success(response?.message)
                reset()
            }
            refetch?.()
            setOpen(false)
        } catch (err: any) {
            const message = err.response?.data?.message
            if (message.toLowerCase().includes("keyword")) {
                setError("keyword", {
                    type: "server",
                    message
                })
                return
            }
        }
    }
    return (<>
        <PopupCE open={open} onOpenChange={setOpen}>
            <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
                <p className="text-xl">{isEdit ? "Edit Keyword" : "Create Keyword"}</p>
                <Button
                    variant="close"
                    size="sm"
                    onClick={() => setOpen(!open)}><Icons.Close />
                </Button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-auto">
                <div className="py-2 px-2 h-6/9 flex-1 overflow-auto">
                    <InputField
                        label="Text"
                        variant="form"
                        inputSize="lg"
                        placeholder="Text"
                        {...register("keyword")}
                        error={errors.keyword?.message}>
                    </InputField>
                </div>
                <div className="px-6 py-4 mt-auto border-t bg-white">
                    <Button
                        type="submit"
                        variant="create">
                        {isEdit ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </PopupCE>
    </>)
}