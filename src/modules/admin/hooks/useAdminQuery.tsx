import { useQuery } from "@tanstack/react-query"
import { GetAllAdmin } from "../api/api"
import { useStore } from "@/hooks/useStore"
import { useDebounce } from "use-debounce"
import type { AdminUserBaseForm } from "../schema/AdminUserSchema"
import { toast } from "react-toastify"

export const useAdminQuery = () => {
  const { search, pageIndex, pageSize, sort } = useStore()
  const [debouncedSearch] = useDebounce(search, 500)

  const query = useQuery<AdminUserBaseForm>({
    queryKey: ["admins", pageIndex, pageSize, debouncedSearch, sort],
    queryFn: async () => {
      try {
        return await GetAllAdmin({
          page: pageIndex + 1,
          limit: pageSize,
          search: debouncedSearch,
          sort,
        })
      } catch (err: any) {
        toast.error(`${err.response?.data?.message}`)
        throw err
      }
    },
  })

  return {
    data: query.data?.data ?? [],
    metadata: query.data?.metadata ?? null,
    loading: query.isLoading,
  }
}
