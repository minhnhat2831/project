import type { ColumnDef } from "@tanstack/react-table"
import type { Admin } from "../types/Admin"
import { Icons } from "@/components/common/Icon"
import { useModalStore } from "@/hooks/useModalStore"
import { useAdminStore } from "../store/useSeletedAdminStore"

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
      const { setOpenEdit, setConfirm } = useModalStore()
      const { setSelectedAdmin } = useAdminStore()
      
      const handleEdit = () => {
        setSelectedAdmin(admin)
        setOpenEdit(true)
      }

      const handleDelete = () => {
        setSelectedAdmin(admin)
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
