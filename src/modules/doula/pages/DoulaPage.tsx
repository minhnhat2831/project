import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "@/components/common/base/TableData";
import { columns } from "../components/columns/DoulaColumns"
import TablePagination from "@/components/common/base/TablePagination";
import { useStore } from "@/hooks/useStore";
import { Container } from "../container/Container";
import Header from "@/layouts/Header";
import useDoula from "../hooks/useDoula";

export default function DoulaPage() {
    const { pageIndex, pageSize, setPagination, search, setSearch } = useStore()
    const { useGetAllDoula } = useDoula()
    const { data, loading, metadata } = useGetAllDoula()

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
            <Header href="/admin/doulas" childrenHref="Admin / Doula Management" searchValue={search} onSearchChange={setSearch} />
            <TableData
                loading={loading}
                table={table}
                pagination={<TablePagination
                    table={table}
                    totalCount={metadata?.totalCount} />}
            />
        </Container>
    </>)
}