import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import type { Doula } from "../types/admin-doula/AdminDoulaId"
import { GetById } from "../api/api"

export const useDouleDetail = (id?: string) => {
    const [data, setData] = useState<Doula | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        const fetchData = async () => {
          setLoading(true)
          try {
            const res = await GetById(id)
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