import { useEffect, useState } from "react"
import { GetAllClient } from "../api/api"
import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"
import type { Client, ClientBaseForm } from "../schema/ClientSchema"

export const useClientFetch = () => {
    const [data, setData] = useState<Client[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<ClientBaseForm["metadata"] | null>(null)
    const { search, pageIndex, pageSize, sort } = useStore()
    const [debouncedSearch] = useDebounce(search, 1000)
    const embed = "address.fullAddress"
    useEffect(() => {
        fetchClient()
    }, [pageIndex, pageSize ,debouncedSearch , sort])

    const fetchClient = async () => {
        setLoading(true)

        const res = await GetAllClient({
            page : pageIndex + 1,
            limit : pageSize,
            search : debouncedSearch,
            embed,
            sort
        })
        setData(res.data)
        setMetadata(res.metadata)
        setLoading(false)
    }

    return { data, loading,metadata, refetch : fetchClient }
}