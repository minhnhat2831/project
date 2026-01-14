import { Icons } from "@/components/common/base/Icon";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../../components/modal/TransactionColumns";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import { useTransactionFetch } from "../../hooks/useTransactionFetch";
import { useParams } from "react-router";
import { useDoulaSubscription } from "../../hooks/useDoulaSubscription";
import { formatDate } from "@/components/common/base/FormatDate";
import { useStore } from "@/hooks/useStore";

export default function DoulaSubscription() {
    const { pageIndex, pageSize, setPagination } = useStore()
    const { id } = useParams<{ id?: string }>()
    const { data, loading, metadata } = useTransactionFetch(pageIndex + 1, pageSize, id)
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel()
    })
    const { data: subscription } = useDoulaSubscription(id)


    return (<>
        <div className="flex overflow-auto justify-between">
            <div className="px-2 py-2 p-24">
                <p className="font-black text-nowrap">Subscription Information</p>
                {!subscription?.id ? <div className="mt-2">No Subscription</div> : <>
                    <div className="border rounded-xl w-100 p-4 mt-5 bg-gray-100 shadow-2xl">
                        <div className="flex justify-between">
                            <div className="flex">
                                <Icons.Subscription />
                                <p>{subscription?.subscription.name}</p>
                            </div>
                            <p className={`${subscription?.status === "cancelled" ? "text-xl font-bold text-red-500" : "text-xl font-bold text-green-500"}`}>{subscription?.status}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Amount</p>
                            <p>{subscription?.price.amount}$ - {subscription?.price.interval} </p>
                        </div>
                        <div className="flex justify-between">
                            <p>Started</p>
                            <p>{formatDate(subscription?.createdAt)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Ends</p>
                            <p>{formatDate(subscription?.endTime)}</p>
                        </div>
                    </div>
                </>}
            </div>
            <div className="ml-32">
                <div className="px-2 py-2">
                    <p className="ml-5 font-black">Billing History</p>
                    <TableData
                        loading={loading}
                        table={table}
                        pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
                    />
                </div>
            </div>
        </div>
    </>)
}