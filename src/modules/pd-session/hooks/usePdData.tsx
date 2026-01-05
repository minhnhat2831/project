import { useEffect, useState } from "react"
import { useStore } from "@/hooks/useStore"
import { GetAll } from "../api/api"
import { toast } from "react-toastify"
import type { Pd, PdResponse } from "../types/Pd"

export const usePdData = () => {
    const [data, setData] = useState<Pd[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<PdResponse["metadata"] | null>(null)
    const { pageIndex, pageSize, search } = useStore()
    const f_type = "pd"
    const sort = "index"
    
    useEffect(() => {
        fetchData()
    },[pageIndex, pageSize, search])

    const fetchData = async () => {
        try{
            setLoading(true)
            const response = await GetAll({
                page : pageIndex + 1,
                limit : pageSize,
                search,
                sort,
                f_type
            })
            setData(response.data)
            setMetadata(response.metadata)
            setLoading(false)
        }catch(err : any){
            toast.error(err.response?.data?.message)
        }
    }

    return { data, loading, metadata, refetch : fetchData}
}