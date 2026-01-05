import { useStore } from "@/hooks/useStore"
import { type Category, type GetCategoryList } from "../types/Category"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { GetAllCategory } from "../api/api"

export const useCategoryData = () => {
    const [data, setData] = useState<Category[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<GetCategoryList["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()

    useEffect(() => {
        fetchData()
    },[pageIndex,pageSize,search,sort])

    const fetchData = async () => {
        try{
            setLoading(true)
            const response = await GetAllCategory({
                page : pageIndex + 1,
                limit : pageSize,
                search,
                sort
            })
            setData(response.data)
            setMetadata(response.metadata)
            setLoading(false)
        }catch(err : any){
            toast.error(err.response.data.message)
        }
    }

    return { data, loading, metadata, refetch : fetchData}
}