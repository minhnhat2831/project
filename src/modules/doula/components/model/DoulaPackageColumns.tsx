import type { ColumnDef } from "@tanstack/react-table";
import type { DoulaPackage } from "../../types/doula-package/DoulaPackage";
import { Icons } from "@/components/common/Icon";
import { formatDate } from "@/components/common/FormatDate";

export const columns:ColumnDef<DoulaPackage>[] = [
    {
        accessorKey : "name",
        header : "Package Name"
    },
    {
        accessorKey : "picture.uri",
        header : "Cover photo",
        cell : ({ getValue }) => {
          const img = getValue<string>()
          return <div><img className="w-10 h-10" src={img} alt={"Pic" + {img}}></img></div>
        }
    },
    {
        accessorKey : "price",
        header : "Price"
    },
    {
        accessorKey : "createdAt",
        header : "Created date",
        cell : ({ getValue }) => {
            const createdAt = getValue<string>()
            return <div>{formatDate(createdAt)}</div>
        }
    },
    {
        accessorKey : "numberOfClients",
        header : "Number of Clients"
    },
    {
        id: "action",
        header: "Action",
        cell: ({}) => {
          return (
            <div className="flex gap-3">
              <button>
                <Icons.Eye className="text-red-400 cursor-pointer" />
              </button>
            </div>
          )
        },
      }
]