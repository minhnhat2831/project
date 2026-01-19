import { useStore } from "@/hooks/useStore"
import { icons } from "@/components/common/base/Icon"

export const SortHeader = ({ columnKey, title }: { columnKey: string, title: string }) => {
  const { sort, setSort, resetData } = useStore()
  const isAsc = sort === columnKey
  const isDesc = sort === `-${columnKey}`

  const handleSort = () => {
    if (!sort) {
      setSort(`${columnKey}`)
    } else if (isAsc) {
      setSort(`-${columnKey}`)
    } else if (isDesc) {
      resetData()
    }
  }

  return (
    <div className="flex items-center gap-1 cursor-pointer" onClick={handleSort}>
      <span>{title}</span>
      {(!isAsc && !isDesc) && <icons.Sort className="w-3 h-3" />}
      {isAsc && <icons.ExpandLess className="w-3 h-3" />}
      {isDesc && <icons.ExpandMore className="w-3 h-3" />}
    </div>
  )
}
