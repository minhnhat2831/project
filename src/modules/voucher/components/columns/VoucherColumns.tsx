import type { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/components/common/base/FormatDate";
import { useModalStore } from "@/hooks/useModalStore";
import { useVoucherStore } from "../../store/useSelectedVoucher";
import { Icons } from "@/components/common/base/Icon";
import { useNavigate } from "react-router";
import { SortHeader } from "@/components/common/base/SortHeader";
import type { Voucher } from "../../schema/VoucherSchema";

export const columns: ColumnDef<Voucher>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "code",
        header: () => <SortHeader columnKey="code" title="Code" />,
    },
    {
        accessorKey: "status",
        header: () => <SortHeader columnKey="status" title="Status" />,
        cell: ({ getValue }) => {
            const status = getValue<string>()
            return (
                <div className="flex items-center gap-2">
                    <span
                        className={`h-2 w-2 rounded-full ${status === "active" ? "bg-green-400" : "bg-red-400"
                            }`}
                    ></span>
                    {status === "active" ? "Active" : "Expired"}
                </div>
            )
        },
    },
    {
        accessorKey: "startDate",
        header: () => <SortHeader columnKey="startDate" title="Start Date" />,
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDate(date)}</div>
        }
    },
    {
        accessorKey: "endDate",
        header: () => <SortHeader columnKey="endDate" title="End Date" />,
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDate(date)}</div>
        }
    },
    {
        accessorKey: "quantityUse",
        header: () => <SortHeader columnKey="quantityUse" title="Nums of use " />,
        cell: ({ getValue, row }) => {
            const numOfUsed = row.original
            const quantityUse = getValue<number>()

            return <div>{numOfUsed.numOfUsed}/{quantityUse}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const voucher = row.original
            const nav = useNavigate()
            const { setOpen, setTypeMode } = useModalStore()
            const { setSelectedVoucher } = useVoucherStore()

            const handleView = () => {
                nav(`/admin/voucher/${voucher.id}`)
            }

            const handleDelete = () => {
                setSelectedVoucher(voucher)
                setTypeMode("edit")
                setOpen(true)
            }

            return (
                <div className="flex gap-3">
                    <button onClick={handleView}>
                        <Icons.Eye className="text-red-400 cursor-pointer" />
                    </button>
                    <button onClick={handleDelete}>
                        <Icons.Trash className="text-gray-600 cursor-pointer" />
                    </button>
                </div>
            )
        },
    },
]