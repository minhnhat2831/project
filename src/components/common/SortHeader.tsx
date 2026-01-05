import { useStore } from "@/hooks/useStore"
import { Icons } from "@/components/common/Icon"

export const SortHeader = ({ columnKey, title }: { columnKey: string, title: string }) => {
  const { sort, setSort } = useStore()
  const isAsc = sort === columnKey
  const isDesc = sort === `-${columnKey}`

  const handleSort = () => {
    if (!sort || sort === `-${columnKey}`) {
      setSort(columnKey) // asc
    } else {
      setSort(`-${columnKey}`) // desc
    }
  }

  return (
    <div className="flex items-center gap-1 cursor-pointer" onClick={handleSort}>
      <span>{title}</span>
      {(!isAsc && !isDesc) && <Icons.Sort className="w-3 h-3" />}
      {isAsc && <Icons.ArrowUp className="w-3 h-3" />}
      {isDesc && <Icons.ArrowDown className="w-3 h-3" />}
    </div>
  )
}
