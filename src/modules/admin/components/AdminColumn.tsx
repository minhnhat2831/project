import type { ColumnDef } from "@tanstack/react-table"
import type { Admin } from "../types/Admin"
import { Icons } from "../../../components/common/Icon"

export const columns: ColumnDef<Admin>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
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
            className={`h-2 w-2 rounded-full ${
              status === "active" ? "bg-green-400" : "bg-gray-400"
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
    cell: ({ row, table }) => {
      const admin = row.original
      const { onEdit } = table.options.meta as any
      const { onDelete } = table.options.meta as any
      return (
        <div className="flex gap-3">
          <button onClick={() => onEdit(admin)}>
            <Icons.Pen className="text-red-400 cursor-pointer" />
          </button>

          <button onClick={() => onDelete(admin)}>
            <Icons.Trash className="text-gray-600 cursor-pointer" />
          </button>
        </div>
      )
    },
  },
]
