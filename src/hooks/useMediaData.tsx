import { GetMedia } from "@/modules/article/api/api"
import type { Media } from "@/types/media/Media.type"
import { useState } from "react"
import { toast } from "react-toastify"

export const useMediaData = () => {
  const [data, setData] = useState<Media | null>(null)
  const [loading, setLoading] = useState(false)

  const getUploadUrl = async (type = "images") => {
    setLoading(true)
    try {
      const res = await GetMedia({ type })
      setData(res.data)
      return res.data
    } catch (err: any) {
      toast.error(err.response?.data?.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, getUploadUrl }
}
