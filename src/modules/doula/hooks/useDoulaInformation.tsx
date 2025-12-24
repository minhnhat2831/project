import { useEffect, useState } from "react"
import { GetDoulaInfo } from "../api/api"
import type { Doula } from "../types/admin-doula/AdminDoulaId"

export const useDoulaInfomation = (id?: string) => {
  const [data, setData] = useState<Doula | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

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
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

  return { data, loading, error, refetch : fetchData }
}