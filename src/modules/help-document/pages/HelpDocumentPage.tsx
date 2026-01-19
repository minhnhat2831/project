import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Container } from "../container/Container";
import { useStore } from "@/hooks/useStore";
import { columns } from "../components/HelpDocumentColumns";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import useHelpDocument from "../hooks/useHelpDocument";
export default function HelpDocumentPage() {
    const { pageIndex, pageSize, setPagination } = useStore()
    const { useGetAllHelpDocument } = useHelpDocument()
    const { data, loading, metadata } = useGetAllHelpDocument()

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