import { useEffect, useState } from "react"
import { GetDoulaInfo } from "../api/api"
import type { Doula } from "../types/admin-doula/AdminDoulaId"
import { toast } from "react-toastify"

export const useDoulaInfomation = (id?: string) => {
  const [data, setData] = useState<Doula | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {  
    fetchData()
  }, [id])

    const fetchData = async () => {
      if (!id) return
      setLoading(true)
      try {
        const res = await GetDoulaInfo(id)
        setData(res.data)
      } catch (err: any) {
        toast.error(err.response.data.message)
      } finally {
        setLoading(false)
      }
    }

  return { data, loading, refetch : fetchData }
}