import type { ColumnDef } from "@tanstack/react-table";
import type { SearchSetting } from "../types/SearchSetting";
import { useSettingStore } from "../store/useSeletedSetting";
import { useModalStore } from "@/hooks/useModalStore";
import { Icons } from "@/components/common/base/Icon";
import { formatDate } from "@/components/common/base/FormatDate";

export const columns: ColumnDef<SearchSetting>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "keyword",
        header: "Text"
    },
    {
        accessorKey: "count",
        header: "Times"
    },
    {
        accessorKey: "createdAt",
        header: "Created Date",
        cell : ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDate(date)}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const searchSetting = row.original
            const { setSelectedSearchSetting } = useSettingStore()
            const { setOpenEdit, setConfirm } = useModalStore()

            const handleEdit = () => {
                setSelectedSearchSetting(searchSetting)
                setOpenEdit(true)
            }

            const handleDelete = () => {
                setSelectedSearchSetting(searchSetting)
                setConfirm(true)
            }

            return (
                <div className="flex gap-3">
                    <button onClick={handleEdit}>
                        <Icons.Pen className="text-red-400 cursor-pointer" />
                    </button>
                    <button onClick={handleDelete}>
                        <Icons.Trash className="text-gray-600 cursor-pointer" />
                    </button>
                </div>
            )
        },
    }
]