import { useEffect, useState } from "react";
import { GetHelpDocumentById } from "../api/api";
import { toast } from "react-toastify";
import type { HelpDocumentId } from "../types/HelpDocumentById";

export default function useHelpDocumentDetail(id? : string) {
    const [data, setData] = useState<HelpDocumentId | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchData()
    },[id])

    const fetchData = async () => {
        if(!id) return
        try{
            setLoading(true)
            const response = await GetHelpDocumentById(id)
            setData(response.data)
            setLoading(false)
        }catch(err : any){
            toast.error(err.response?.data?.message)
        }
    }

    return { data, loading }
}