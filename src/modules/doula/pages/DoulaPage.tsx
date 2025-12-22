import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "../../../components/common/TableData";
import Header from "../../../layouts/Header";
import { columns } from "../components/DoulaColumns"
import { useDouleFetch } from "../hooks/useDoulaFetch";
import { useState } from "react";
import TablePagination from "../../../components/common/TablePagination";
export default function DoulaPage() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25,
    })
    const page = pagination.pageIndex + 1
    const limit = pagination.pageSize
    const { data, loading, metadata } = useDouleFetch(page, limit)
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
    })
    return (<>
        <Header href="/admin/doulas" childrenHref="Admin / Doula Management" />
        <TableData
            loading={loading}
            table={table}
            pagination={<TablePagination table={table} totalCount={metadata?.totalCount}/>}
        >
        </TableData>
    </>)
}