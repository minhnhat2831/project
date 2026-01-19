import type { ColumnDef } from "@tanstack/react-table";
import { icons } from "@/components/common/base/Icon";
import { formatDate } from "@/components/common/base/FormatDate";
import type { doulaPackageListItem } from "../../schema/types/DoulaPackageSchema.type";

export const columns: ColumnDef<doulaPackageListItem>[] = [
  {
    accessorKey: "name",
    header: "Package Name",
    cell: ({ getValue }) => {
      const name = getValue<string>()
      return <div
        dangerouslySetInnerHTML={{
          __html: name || ""
        }}
      />
    }
  },
  {
    accessorKey: "picture.uri",
    header: "Cover photo",
    cell: ({ getValue }) => {
      const img = getValue<string>()
      return <div><img className="w-10 h-10" src={img} alt={"Pic" + { img }}></img></div>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ getValue }) => {
      const price = getValue<string>()
      return <div
        dangerouslySetInnerHTML={{
          __html: price || ""
        }}
      />
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created date",
    cell: ({ getValue }) => {
      const createdAt = getValue<string>()
      return <div>{formatDate(createdAt)}</div>
    }
  },
  {
    accessorKey: "numberOfClients",
    header: "Number of Clients"
  },
  {
    id: "action",
    header: "Action",
    cell: ({ row, table }) => {
      const doula = row.original
      const { onView } = table.options.meta as any
      return (
        <div className="flex gap-3">
          <button onClick={() => onView(doula)}>
            <icons.Eye className="text-red-400 cursor-pointer" />
          </button>
        </div>
      )
    },
  }
]