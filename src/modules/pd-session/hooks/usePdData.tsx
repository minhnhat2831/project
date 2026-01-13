import { useEffect, useState } from "react"
import { useStore } from "@/hooks/useStore"
import { GetAll } from "../api/api"
import { toast } from "react-toastify"
import type { Pd, PdResponse } from "../types/Pd"
import { useDebounce } from "use-debounce"

export const usePdData = () => {
    const [data, setData] = useState<Pd[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<PdResponse["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()
    const[debouncedSearch] = useDebounce(search, 1000)
    const f_type = "pd"

    useEffect(() => {
        fetchData()
    },[pageIndex, pageSize, debouncedSearch, sort])

    const fetchData = async () => {
        try{
            setLoading(true)
            const response = await GetAll({
                page : pageIndex + 1,
                limit : pageSize,
                search : debouncedSearch,
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