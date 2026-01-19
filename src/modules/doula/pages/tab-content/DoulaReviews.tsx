import { icons } from "@/components/common/base/Icon";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../../components/columns/DoulaReviewColumns";
import { useParams } from "react-router";
import { useStore } from "@/hooks/useStore";
import { useDoulaReviewQuery } from "../../hooks/useDoulaReview";

export default function DoulaReviews() {
    const { pageIndex, pageSize, setPagination } = useStore()
    const { id } = useParams<{ id?: string }>()
    const { data, loading, metadata } = useDoulaReviewQuery(id)
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),

    })
    return (<>
        <div className="flex justify-between px-4 leading-8">
            <div>
                <p className="font-bold">Average Rating</p>
                <p className="font-bold text-3xl flex">N/A<icons.Star className="text-yellow-400" fontSize="large" /></p>
                <p className="text-gray-400 text-nowrap">No Reviews Yet</p>
            </div>
            <div className="ml-50">
                <p className="font-bold ml-5">Review History</p>
                <TableData
                    loading={loading}
                    table={table}
                    pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
                />
            </div>
        </div>
    </>)
}