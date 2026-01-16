import TableData from "@/components/common/base/TableData"
import TablePagination from "@/components/common/base/TablePagination"
import { useStore } from "@/hooks/useStore"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Container } from "../container/Container"
import { columns } from "../components/PdColumns"
import { usePdQuery } from "../hooks/usePdQuery"

export default function PdSessionPage() {
    const { data, loading, metadata } = usePdQuery()
    const { pageIndex, pageSize, setPagination  } = useStore()

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
    return (
        <>
            <Container>
                <TableData
                    loading={loading}
                    table={table}
                    pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
                ></TableData>
            </Container>
        </>
    )
}