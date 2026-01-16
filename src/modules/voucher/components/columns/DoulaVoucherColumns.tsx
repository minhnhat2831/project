import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/components/common/base/FormatDate";
import type { VoucherDoula } from "../../schema/VoucherSchema";

export const columns: ColumnDef<VoucherDoula>[] = [
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