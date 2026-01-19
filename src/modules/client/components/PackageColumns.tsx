import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/components/common/base/FormatDate";
import { SortHeader } from "@/components/common/base/SortHeader";
import type { caresListItem } from "../schema/CaresSchema.type";

export const columns: ColumnDef<caresListItem>[] = [
    {
        accessorKey: "doula.title",
        header: "Package Name"
    },
    {
        accessorKey: "doula.user.fullName",
        header: "Doulas Full Name"
    },
    {
        accessorKey: "startDate",
        header: () => <SortHeader columnKey="startDate" title="StartDate" />,
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDate(date)}</div>
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
        }
    }
]