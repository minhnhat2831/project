import { useEffect, useState } from "react"
import { VoucherById } from "../api/api"
import { toast } from "react-toastify"
import type { VoucherId } from "../types/VoucherId"

export const useVoucherId = (id?: string) => {
  const [data, setData] = useState<VoucherId | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {  
    fetchData()
  }, [id])

    const fetchData = async () => {
      if (!id) return
      setLoading(true)
      try {
        const res = await VoucherById(id)
        setData(res.data)
      } catch (err: any) {
        toast.error(err.response.data.message)
      } finally {
        setLoading(false)
      }
    }

  return { data, loading, refetch : fetchData }
}