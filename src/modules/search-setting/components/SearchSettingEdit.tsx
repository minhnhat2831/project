import Button from "@/components/common/form/Button";
import type { SearchSetting } from "../types/SearchSetting";
import InputField from "@/components/common/form/Input";
import { EditSetting } from "../api/api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import type { SearchSettingEditRequest } from "../types/SearchSettingEdit";
import { useRefetchData } from "@/hooks/useRefetch";
import { Icons } from "@/components/common/Icon";

interface props {
    open: boolean,
    setOpen: (open: boolean) => void,
    keyword: SearchSetting
}

export default function SearchSettingEdit({ open, setOpen, keyword }: props) {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<SearchSettingEditRequest>({
        defaultValues: {
            keyword: keyword.keyword,
            count: 1,
            isSuggestion: true,
        }
    })
    const { refetch } = useRefetchData()

    const onSubmit = async (data: SearchSettingEditRequest) => {
        try {
            const response = await EditSetting(keyword.id, data)
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
            <button className="font-bold rounded-full mr-2 cursor-pointer hover:bg-gray-200 w-6" onClick={() => setOpen(!open)}><Icons.Close /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full overflow-auto">
            <div className="py-2 px-2 h-6/9 flex-1 overflow-auto">
                <InputField
                    label="Text"
                    variant="form"
                    inputSize="lg"
                    placeholder="Text"
                    {...register("keyword", {
                        required: "This field is required",
                    })}
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