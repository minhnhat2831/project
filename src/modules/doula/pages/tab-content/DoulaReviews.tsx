import { Icons } from "@/components/common/Icon";
import { useDoulaReview } from "../../hooks/useDoulaReview";
import TableData from "@/components/common/TableData";
import TablePagination from "@/components/common/TablePagination";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../../components/model/DoulaReview";
import { useParams } from "react-router";
import { usePaginationStore } from "@/hooks/usePageStore";
export default function DoulaReviews() {
    const { pageIndex, pageSize, setPagination } = usePaginationStore()
    const { id } = useParams<{ id?: string }>()
    const page = pageIndex + 1
    const limit = pageSize
    const { data, loading, metadata } = useDoulaReview(page, limit, id)
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
                <p className="font-bold text-3xl flex">N/A<Icons.Star className="text-yellow-400" fontSize="large" /></p>
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