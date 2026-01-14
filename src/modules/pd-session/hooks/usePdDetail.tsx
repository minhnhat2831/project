import { useEffect, useState } from "react";
import { GetById } from "../api/api";
import { toast } from "react-toastify";
import type { Pd } from "../schema/PdSchema";

export default function usePdDetail(id? : string) {
    const [data, setData] = useState<Pd | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    },[id])

    const fetchData = async () => {
        if(!id) return
        try{
            setLoading(true)
            const response = await GetById(id)
            setData(response.data)
            setLoading(false)
        }catch(err : any){
            toast.error(err.response?.data?.message)
        }
    }

    return { data, loading }
}