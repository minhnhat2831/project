import type { ColumnDef } from "@tanstack/react-table";
import { Icons } from "@/components/common/base/Icon"
import { formatDate } from "@/components/common/base/FormatDate";
import Avatar from "@mui/material/Avatar";
import { useDoulaStore } from "../../store/useSelectedDoula";
import { useModalStore } from "@/hooks/useModalStore";
import { useNavigate } from "react-router";
import { SortHeader } from "@/components/common/base/SortHeader";
import type { Doula } from "../../schema/DoulaSchema";
export const columns: ColumnDef<Doula>[] = [
  {
    accessorFn: (row) => row.picture?.uri ?? null,
    header: "Avatar",
    cell: ({ getValue }) => {
      const src = getValue<string | null>();
      return src ? (
        <Avatar src={src} className="w-10 h-10 rounded-full" />
      ) : (
        <Avatar />
      );
    },
  }
  ,
  {
    accessorKey: "user.fullName",
    header: () => <SortHeader columnKey="user.firstName" title="Full Name" />
  },
  {
    accessorKey: "user.email",
    header: () => <SortHeader columnKey="user.email" title="Email" />
  },
  {
    accessorKey: "user.phoneNumber",
    header: "Phone",
    cell: ({ getValue, row }) => {
      const phone = getValue<string>()
      const countryCode = row.original.user.countryCode
      return <div>{countryCode} {phone}</div>
    }
  }
  ,
  {
    accessorKey: "user.birthDate",
    header: "birthDate",
    cell: ({ getValue }) => {
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
    header: () => <SortHeader columnKey="createdAt" title="CreatedAt" />,
    cell: ({ getValue }) => {
      const createdAt = getValue<Date>()
      return <div>{formatDate(createdAt)}</div>
    }
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
    },
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const doula = row.original
      const nav = useNavigate()
      const { setSelectedDoula } = useDoulaStore()
      const { setOpen, setTypeMode } = useModalStore()

      const handleView = () => {
          setSelectedDoula(doula)
          nav(`/admin/doulas/${doula.id}`)
      }

      const handleEdit = () => {
          setSelectedDoula(doula)
          setTypeMode("edit")
          setOpen(true)
      }

      const handleDelete = () => {
          setSelectedDoula(doula)
          setTypeMode("delete")
          setOpen(true)
      }
      
      return (
        <div className="flex gap-3">
          <button onClick={handleView}>
            <Icons.Eye className="text-red-400 cursor-pointer" />
          </button>
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