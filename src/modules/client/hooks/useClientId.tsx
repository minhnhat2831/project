import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { GetClientId } from "../api/api"
import type { ClientId } from "../types/client/ClientId"

export const useClientIdFetch = (id?: string) => {
    const [data, setData] = useState<ClientId | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        const fetchData = async () => {
          setLoading(true)
          try {
            const res = await GetClientId(id)
            setData(res.data)
          } catch (err: any) {
            toast.error(err.response.data.message)
          } finally {
            setLoading(false)
          }
        }
        fetchData()
      }, [id])

    return { data, loading }
}