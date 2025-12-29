import { useEffect, useState } from "react"
import type { DoulaSubscriptions } from "../types/doula_subscription/DoulaSubscription"
import { GetDoulaSubscription } from "../api/api"
import { toast } from "react-toastify"

export const useDoulaSubscription = (id?: string) => {
  const [data, setData] = useState<DoulaSubscriptions | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!id) return
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await GetDoulaSubscription(id)
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