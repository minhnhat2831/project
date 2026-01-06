import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useStore } from "@/hooks/useStore"
import type { HelpDocument, HelpDocumentResponse } from "../types/HelpDocument"
import { GetAllHelpDocument } from "../api/api"

export const useHelpDocumentData = () => {
    const [data, setData] = useState<HelpDocument[]>([])
    const [loading, setLoading] = useState(false)
    const [metadata, setMetadata] = useState<HelpDocumentResponse["metadata"] | null>(null)
    const { pageIndex, pageSize, search, sort } = useStore()
    
    useEffect(() => {
        fetchData()
    }, [pageIndex, pageSize, search, sort])

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await GetAllHelpDocument({
                page : pageIndex + 1,
                limit : pageSize,
                search,
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