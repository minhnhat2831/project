import type { ColumnDef } from "@tanstack/react-table"

import { icons } from "@/components/common/base/Icon"
import { useModalStore } from "@/hooks/useModalStore"
import { useAdminStore } from "../store/useSeletedAdminStore"
import { SortHeader } from "@/components/common/base/SortHeader"
import type { adminListItem } from "../schema/AdminUserSchema.type"

export const columns: ColumnDef<adminListItem>[] = [
  {
    accessorKey: "username",
    header: () => <SortHeader columnKey="username" title="Username" />,
  },
  {
    accessorKey: "firstName",
    header: () => <SortHeader columnKey="firstName" title="First Name" />,
  },
  {
    accessorKey: "lastName",
    header: () => <SortHeader columnKey="lastName" title="Last Name" />,
  },
  {
    accessorKey: "email",
    header: () => <SortHeader columnKey="email" title="Email" />,
  },
  {
    accessorKey: "role",
    header: "Role",
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
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const admin = row.original
      const { setOpen, setTypeMode } = useModalStore()
      const { setSelectedAdmin } = useAdminStore()

      const handleEdit = () => {
        setSelectedAdmin(admin)
        setTypeMode("edit")
        setOpen(true)
      }

      const handleDelete = () => {
        setSelectedAdmin(admin)
        setTypeMode("delete")
        setOpen(true)
      }

      return (
        <div className="flex gap-3">
          <button onClick={handleEdit}>
            <icons.Pen className="text-red-400 cursor-pointer" />
          </button>

          <button onClick={handleDelete}>
            <icons.Trash className="text-gray-600 cursor-pointer" />
          </button>
        </div>
      )
    },
  },
]
