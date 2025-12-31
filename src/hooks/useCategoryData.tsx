import { useStore } from "@/hooks/useStore"
import { type Category, type GetCategoriesResponse } from "@/types/categories/Category"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { GetCategory } from "../modules/article/api/api"

export const useCategoryData = () => {
    const [data, setData] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetCategoriesResponse["metadata"] | null>(null)
    const { pageIndex, pageSize } = useStore()
    const f_status = "active"

    useEffect(() => {
        fetchData()
    },[pageIndex,pageSize])

    const fetchData = async () => {
        try{
            setLoading(true)
            const response = await GetCategory({
                page : pageIndex + 1,
                limit : pageSize,
                f_status
            })
            setData(response.data)
            setMetadata(response.metadata)
            setLoading(false)
        }catch(err : any){
            toast.error(err.response.data.message)
        }
    }

    return { data, loading, metadata}
}