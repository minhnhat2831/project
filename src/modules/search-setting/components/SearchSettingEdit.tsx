import Button from "@/components/common/form/Button";
import type { SearchSetting } from "../types/SearchSetting";
import InputField from "@/components/common/form/Input";
import { EditSetting } from "../api/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRefetchData } from "@/hooks/useRefetch";
import { Icons } from "@/components/common/base/Icon";
import { SearchSettingScheme, type SearchSettingForm } from "../util/SearchSettingSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface props {
    open: boolean,
    setOpen: (open: boolean) => void,
    keyword: SearchSetting
}

export default function SearchSettingEdit({ open, setOpen, keyword }: props) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<SearchSettingForm>({
        resolver : zodResolver(SearchSettingScheme) as any,
        defaultValues: {
            keyword: keyword.keyword,
        }
    })
    const { refetch } = useRefetchData()

    const onSubmit = async (data: SearchSettingForm) => {
        try {
            const searchSettingData = { ...(data as any), count : 1, isSuggestion : true}
            const response = await EditSetting(keyword.id, searchSettingData)
            toast.success(response?.message)
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
        <div className="w-full h-1/12 border-b px-5 flex justify-between items-center">
            <p className="text-xl">Edit Keyword</p>
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
                    Update
                </Button>
            </div>
        </form>
    </>)
}