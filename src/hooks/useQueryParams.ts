import { useLocation, useNavigate } from "react-router"
import queryString from "query-string"

export function useQueryParams() {
  const location = useLocation()
  const navigate = useNavigate()

  const params = queryString.parse(location.search)

  const handleSearchQuery = () => {
    const search = (params.search as string) ?? undefined
    const setSearch = (value: string) => {
      navigate({
        pathname: location.pathname,
        search: queryString.stringify(
          {
            search: value || undefined,
            page: 1
          },
        ),
      })
    }
    return { search, setSearch }
  }

  const handlePageIndexQuery = () => {

  }

  const handlePageSizeQuery = () => {

  }

  const handlePageChangeQuery = () => {

  }

  const handleFilterQuery = () => {

  }

  const resetParams = () =>
    navigate({
      pathname: location.pathname
    })

  return {
    handleSearchQuery,
    handlePageChangeQuery,
    handlePageIndexQuery,
    handlePageSizeQuery,
    handleFilterQuery,
    resetParams
  }
}
