import type { ColumnDef } from "@tanstack/react-table";
import { SortHeader } from "@/components/common/base/SortHeader";
import { formatDate } from "@/components/common/base/FormatDate";
import { Icons } from "@/components/common/base/Icon";
import { useModalStore } from "@/hooks/useModalStore";
import { useDocumentStore } from "../store/useSelectedDocument";
import type { HelpDocument } from "../schema/HelpDocumentSchema";

export const columns: ColumnDef<HelpDocument>[] = [
  {
    accessorKey: "id",
    header: () => <SortHeader columnKey="id" title="ID" />
  },
  {
    accessorKey: "title",
    header: () => <SortHeader columnKey="title" title="Title" />
  },
  {
    accessorKey: "status",
    header: () => <SortHeader columnKey="status" title="Status" />,
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
      const helpDocument = row.original
      const { setSelectedDocument } = useDocumentStore()
      const { setOpen, setTypeMode } = useModalStore()

      const handleEdit = () => {
        setSelectedDocument(helpDocument)
        setTypeMode("edit")
        setOpen(true)
      }

      const handleDelete = () => {
        setSelectedDocument(helpDocument)
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