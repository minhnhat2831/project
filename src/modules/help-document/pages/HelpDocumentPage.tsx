import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Container } from "../container/Container";
import { useStore } from "@/hooks/useStore";
import { columns } from "../components/HelpDocumentColumns";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import { useHelpDocumentQuery } from "../hooks/useHelpDocumentQuery";
export default function HelpDocumentPage() {
    const { pageIndex, pageSize, setPagination } = useStore()
    const { data, loading, metadata } = useHelpDocumentQuery()

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
                table={table}
                loading={loading}
                pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
            />
        </Container>
    </>)
}