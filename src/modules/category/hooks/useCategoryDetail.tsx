import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GetCategoryId } from "../api/api";
import type { Category } from "../schema/CategorySchema";

export default function useCategoryDetail(id? : string) {
    const [data, setData] = useState<Category | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    },[id])

    const fetchData = async () => {
        if(!id) return
        try{
            setLoading(true)
            const response = await GetCategoryId(id)
            setData(response.data)
            setLoading(false)
        }catch(err : any){
            toast.error(err.response?.data?.message)
        }
    }

    return { data, loading }
}