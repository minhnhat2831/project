import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/components/common/base/FormatDate";
import type { voucherDoulaListItem } from "../../schema/VoucherSchema.type";

export const columns: ColumnDef<voucherDoulaListItem>[] = [
    {
        accessorFn: (row) => row.doulaUser?.fullName ?? null,
        header: "Take by"
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDate(date)}</div>
        }
    }
]