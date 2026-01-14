import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/components/common/base/FormatDate";
import { Icons } from "@/components/common/base/Icon";
import { useModalStore } from "@/hooks/useModalStore";
import { useCategoryStore } from "../store/useSelectedCategory";
import { SortHeader } from "@/components/common/base/SortHeader";
import type { Category } from "../schema/CategorySchema";

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: () => <SortHeader columnKey="name" title="Name" />,
    },
    {
        accessorFn: (row) => row.picture?.uri ?? null,
        header: "Image",
        cell: ({ getValue }) => {
            const image = getValue<string>()
            return <div>{image ? (<img src={image} width={50} height={50}></img>) : ""}</div>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue<string>()
            return (
                <div className="flex items-center gap-2">
                    <span
                        className={`h-2 w-2 rounded-full ${status === "active" ? "bg-green-400" : "bg-gray-400"
                            }`}
                    ></span>
                    {status === "active" ? "Active" : "Inactive"}
                </div>
            )
        }

    },
    {
        accessorKey: "createdAt",
        header: () => <SortHeader columnKey="createdAt" title="Created Date" />,
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDate(date)}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const category = row.original
            const { setOpen, setTypeMode } = useModalStore()
            const { setSelectedCategory } = useCategoryStore()

            const handleEdit = () => {
                setSelectedCategory(category)
                setTypeMode("edit")
                setOpen(true)
            }

            const handleDelete = () => {
                setSelectedCategory(category)
                setTypeMode("delete")
                setOpen(true)
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
    },
]