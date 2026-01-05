import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { CategoryId } from "../types/CategoryId";
import { GetCategoryId } from "../api/api";

export default function useCategoryId(id? : string) {
    const [data, setData] = useState<CategoryId | null>(null)
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