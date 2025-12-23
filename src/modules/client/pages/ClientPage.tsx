import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "@/components/common/TableData";
import Header from "@/layouts/Header";
import { useClientFetch } from "../hooks/useClientFetch";
import { columns } from "../components/ClientColumns"
import TablePagination from "@/components/common/TablePagination";
import { usePaginationStore } from "@/hooks/usePageStore";
import { useFilterStore } from "@/hooks/useFilterStore";

export default function ClientPage() {
    const{pageIndex, pageSize,setPagination} = usePaginationStore()
    const page = pageIndex + 1
    const limit = pageSize
    const search = useFilterStore(state => state.search)
    const Setsearch = useFilterStore(state => state.setSearch)
    const { data, loading, metadata } = useClientFetch(page, limit,search)
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
        <Header href="/admin/clients" childrenHref="Admin / Client Management" searchValue={search} onSearchChange={Setsearch} />
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