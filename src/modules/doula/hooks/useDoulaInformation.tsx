import { useEffect, useState } from "react"
import { GetDoulaInfo } from "../api/api"
import type { Doula } from "../types/adminDoula/AdminDoulaId"

export const useDoulaInfomation = (id?: string) => {
  const [data, setData] = useState<Doula | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
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
    fetchData()
  }, [id])

  return { data, loading, error }
}