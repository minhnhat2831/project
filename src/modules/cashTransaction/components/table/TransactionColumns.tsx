import type { ColumnDef } from "@tanstack/react-table";
import type { cashTransactionList } from "../../schema/Schema.type";
import { Icons } from "@/components/common/base/Icon";
import { TRANSACTION_TYPE_LABEL_MAP } from "../../constants/TransactionType";
import { useModalTypeStore } from "../../store/useModalTypeStore";
import { useDataStore } from "../../store/useDataStore";

export const columns: ColumnDef<cashTransactionList>[] = [
    {
        accessorKey: "createDo",
        header: "Created Date",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "effectiveDo",
        header: "Effective Date",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "groupId",
        header: "Group Id",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "transactionId",
        header: "Cash Transaction ID",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "orgName",
        header: "Client Name",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "transactionType",
        header: "Type",
        cell: ({ getValue }) => {
            const formatTransactionType = (value?: string) => {
                if (!value) return '-'
                return TRANSACTION_TYPE_LABEL_MAP[value] ?? value
            }
            const data = getValue<string>()
            return (formatTransactionType(data) || "-")
        }
    },
    {
        accessorKey: "bankAccountNum",
        header: "Bank Account",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "isin",
        header: "ISIN",
        cell: ({ getValue }) => {
            const data = getValue<string>()
            return (data || "-")
        }
    },
    {
        accessorKey: "debit",
        header: "Debit",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "credit",
        header: "Credit",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "bankChargesAmt",
        header: "Bank Charges",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "feesAmt",
        header: "Fees",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "gstAmt",
        header: "GST",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        accessorKey: "netAmt",
        header: "Net Amount",
        cell: ({ getValue }) => {
            const formatter = new Intl.NumberFormat('en-US');
            const data = getValue<number>()
            return (formatter.format(data) || "-")
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const data = row.original
            const { setOpen, setTypeOpen } = useModalTypeStore()
            const { setSelectedData } = useDataStore()
            const handleView = () => {
                setOpen(true)
                setSelectedData(data)
                setTypeOpen("View")
            }
            return (
                <div className="flex gap-3">
                    <button onClick={handleView}>
                        <Icons.Eye className="text-red-400 cursor-pointer" />
                    </button>
                </div>
            )
        },
    }
]