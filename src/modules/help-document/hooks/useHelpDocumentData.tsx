import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useStore } from "@/hooks/useStore"
import { GetAllHelpDocument } from "../api/api"
import { useDebounce } from "use-debounce"
import type { HelpDocument, HelpDocumentBaseForm } from "../schema/HelpDocumentSchema"

export const useHelpDocumentData = () => {
    const [data, setData] = useState<HelpDocument[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<HelpDocumentBaseForm["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()
    const[debouncedSearch] = useDebounce(search, 1000)
    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, debouncedSearch, sort])

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await GetAllHelpDocument({
                page : pageIndex + 1,
                limit : pageSize,
                search : debouncedSearch,
                sort
            })
            setData(res.data)
            setMetadata(res.metadata)
            setLoading(false)
        } catch (err: any) {
            toast.error(err.response.data.message)
        }

    }
    return { data, loading, metadata, refetch: fetchData }
}