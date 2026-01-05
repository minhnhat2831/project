import type { ColumnDef } from "@tanstack/react-table";
import type { DoulaVoucher } from "../types/DoulaVoucher";
import { formatDate } from "@/components/common/FormatDate";

export const columns:ColumnDef<DoulaVoucher>[] = [
    {
        accessorFn: (row) => row.doulaUser?.fullName ?? null,
        header : "Take by"
    },
    {
        accessorKey : "createdAt",
        header : "Date",
        cell : ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDate(date)}</div>
        }
    }
]