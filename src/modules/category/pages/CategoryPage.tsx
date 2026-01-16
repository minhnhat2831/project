import { useStore } from "@/hooks/useStore";
import Container from "../container/Container";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../components/CategoryColumns";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import { useCategoryQuery } from "../hooks/useCategoryQuery";

export default function CategoryPage() {
    const { pageIndex, pageSize, setPagination } = useStore();
    const { data, loading, metadata } = useCategoryQuery()

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize }
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel()
    })
    return (<>
        <Container>
            <TableData
                loading={loading}
                table={table}
                pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
            />
        </Container>
    </>)
}