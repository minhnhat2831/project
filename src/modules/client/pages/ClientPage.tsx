import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "../../../components/common/TableData";
import Header from "../../../layouts/Header";
import { useState } from "react";
import { useClientFetch } from "../hooks/useClientFetch";
import { columns } from "../components/ClientColumns"
import TablePagination from "../../../components/common/TablePagination";

export default function ClientPage() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25,
    })
    const page = pagination.pageIndex + 1
    const limit = pagination.pageSize
    const { data, loading, metadata } = useClientFetch(page, limit)
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