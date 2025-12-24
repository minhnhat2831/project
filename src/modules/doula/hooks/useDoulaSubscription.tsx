import { useEffect, useState } from "react"
import type { DoulaSubscriptions } from "../types/doula_subscription/DoulaSubscription"
import { GetDoulaSubscription } from "../api/api"

export const useDoulaSubscription = (id?: string) => {
  const [data, setData] = useState<DoulaSubscriptions | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await GetDoulaSubscription(id)
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