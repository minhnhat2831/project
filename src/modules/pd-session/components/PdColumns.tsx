import type { ColumnDef } from "@tanstack/react-table";
import { Icons } from "@/components/common/base/Icon";
import { useModalStore } from "@/hooks/useModalStore";
import { usePdStore } from "../store/useSelectedPd";
import { SortHeader } from "@/components/common/base/SortHeader";
import { formatDateTime } from "@/components/common/base/FormatDate";
import type { pdListItem } from "../schema/PdSchema.type";

export const columns: ColumnDef<pdListItem>[] = [
    {
        accessorKey: "id",
        header: () => <SortHeader columnKey="id" title="ID" />,
    },
    {
        accessorKey: "title",
        header: () => <SortHeader columnKey="title" title="Title" />,
    },
    {
        accessorKey: "author",
        header: () => <SortHeader columnKey="author" title="Author" />,
    },
    {
        accessorKey: "category.name",
        header: () => <SortHeader columnKey="category.name" title="Category" />,
    },
    {
        accessorKey: "createdAt",
        header: () => <SortHeader columnKey="createdAt" title="Created Date" />,
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDateTime(date)}</div>
        }
    },
    {
        accessorKey: "status",
        header: () => <SortHeader columnKey="status" title="Status" />,
        cell: ({ getValue }) => {
            const status = getValue<string>()

            return (<>
                <div className="flex items-center gap-2">
                    {status === "published" ? (<>
                        <span
                            className={`h-2 w-2 flex items-center rounded-full bg-green-400`}
                        ></span><p>Published</p>
                    </>) : ""}
                    {status === "unpublished" ? (<>
                        <span
                            className={`h-2 w-2 rounded-full bg-gray-400`}
                        ></span><p>Unpublished</p>
                    </>) : ""}
                    {status === "draft" ? (<>
                        <span
                            className={`h-2 w-2 rounded-full bg-yellow-400`}
                        ></span><p>Draft</p>
                    </>) : ""}
                </div>
            </>

            )
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const pdsession = row.original
            const { setOpen, setTypeMode } = useModalStore()
            const { setSelectedPd } = usePdStore()

            const handleEdit = () => {
                setSelectedPd(pdsession)
                setTypeMode("edit")
                setOpen(true)
            }

            const handleDelete = () => {
                setSelectedPd(pdsession)
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