import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "@/components/common/TableData";
import Header from "@/layouts/Header";
import { useClientFetch } from "../hooks/useClientFetch";
import { columns } from "../components/ClientColumns"
import TablePagination from "@/components/common/TablePagination";
import { usePaginationStore } from "@/store/usePageStore";

export default function ClientPage() {
    const{pageIndex, pageSize,setPagination} = usePaginationStore()
    const page = pageIndex + 1
    const limit = pageSize
    const { data, loading, metadata } = useClientFetch(page, limit)
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination : {pageIndex, pageSize},
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
    })
    return (<>
        <Header href="/admin/clients" childrenHref="Admin / Client Management" />
        <TableData
            loading={loading}
            table={table}
            pagination={
                <TablePagination table={table} totalCount={metadata?.totalCount}/>
            }
        >
        </TableData>
    </>)
}