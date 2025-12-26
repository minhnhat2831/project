import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import type { DoulaPackageId } from "../types/doula-package/DoulaPackageId"
import { GetDoulaPackageId } from "../api/api"

export const usePackageFetch = (id?: string) => {
  const [data, setData] = useState<DoulaPackageId | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {  
    fetchData()
  }, [id])

    const fetchData = async () => {
      if (!id) return
      setLoading(true)
      try {
        const res = await GetDoulaPackageId(id)
        setData(res.data)
      } catch (err: any) {
        toast.error(err.response.data.message)
      } finally {
        setLoading(false)
      }
    }

  return { data, loading, error, refetch : fetchData }
}