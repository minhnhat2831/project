import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "@/components/common/base/TableData";
import Header from "@/layouts/Header";
import { useClientFetch } from "../hooks/useClientFetch";
import { columns } from "../components/ClientColumns"
import TablePagination from "@/components/common/base/TablePagination";
import { useStore } from "@/hooks/useStore";
import { Container } from "../container/Container";
import { useRefetchData } from "@/hooks/useRefetch";
import { useEffect } from "react";

export default function ClientPage() {
    const { search, setSearch, pageIndex, pageSize, setPagination, resetData } = useStore()
    const { data, loading, metadata, refetch } = useClientFetch()
    const { setRefetch } = useRefetchData()

    useEffect(() => {
        resetData?.()
        setRefetch(refetch)
    },[setRefetch])
    
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
        <Container>
            <Header href="/admin/clients" childrenHref="Admin / Client Management" searchValue={search} onSearchChange={setSearch} />
            <TableData
                loading={loading}
                table={table}
                pagination={
                    <TablePagination table={table} totalCount={metadata?.totalCount} />
                }
            >
            </TableData>
        </Container>
    </>)
}