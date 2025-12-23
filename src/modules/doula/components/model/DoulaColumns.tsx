import type { ColumnDef } from "@tanstack/react-table";
import type { AdminDoula } from "../../types/adminDoula/AdminDoula";
import { Icons } from "@/components/common/Icon"
import { formatDate } from "@/components/common/FormatDate";
export const columns: ColumnDef<AdminDoula>[] = [
  {
    accessorKey: "picture.uri",
    header: "Avatar",
    cell: ({ getValue }) => {
    const src = getValue() as string | null;

    return src ? (
      <img
        src={src}
        className="w-10 h-10 rounded-full"
      />
    ) : (
      <div><Icons.NonAvatar fontSize="large" /></div>
    );
  },
  },
  {
    accessorKey: "user.fullName",
    header: "Full name"
  },
  {
    accessorKey: "user.email",
    header: "Email"
  },
  {
    accessorKey: "user.phoneNumber",
    header: "Phone",
    cell:({ cell }) => {
      const phone = cell.getValue() as string | null
      return phone ? <div>+65 {cell.getValue() as string}</div> : null
    }
  },
  {
    accessorKey: "user.birthDate",
    header: "birthDate",
    cell : ({ getValue }) => {
      const bd = getValue<Date>()
      return <div>{formatDate(bd)}</div>
    }
  },
  {
    accessorKey: "address.fullAddress",
    header: "Address"
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    cell : ({ getValue }) => {
      const createdAt = getValue<Date>()
      return <div>{formatDate(createdAt)}</div>
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
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row, table }) => {
      const doula = row.original
      const { onView } = table.options.meta as any
      const { onEdit } = table.options.meta as any
      const { onDelete } = table.options.meta as any
      return (
        <div className="flex gap-3">
          <button onClick={() => onView(doula)}>
            <Icons.Eye className="text-red-400 cursor-pointer" />
          </button>
          <button onClick={() => onEdit(doula)}>
            <Icons.Pen className="text-red-400 cursor-pointer" />
          </button>
          <button onClick={() => onDelete(doula)}>
            <Icons.Trash className="text-gray-600 cursor-pointer" />
          </button>
        </div>
      )
    },
  },
]