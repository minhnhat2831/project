import type { ColumnDef } from "@tanstack/react-table";
import type { Pd } from "../types/Pd";
import { Icons } from "@/components/common/Icon";
import { useModalStore } from "@/hooks/useModalStore";
import { useSelectedPd } from "../store/useSeletedPd";

export const columns: ColumnDef<Pd>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "category.name",
        header: "Category"
    },
    {
        accessorKey: "createdAt",
        header: "Created Date"
    },
    {
        accessorKey: "status",
        header: "Status",
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
            const { setOpenEdit, setConfirm } = useModalStore()
            const { setSelectedPd } = useSelectedPd()

            const handleEdit = () => {
                setSelectedPd(pdsession)
                setOpenEdit(true)
            }

            const handleDelete = () => {
                setSelectedPd(pdsession)
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
    },
]