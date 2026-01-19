import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { columns } from "../components/AdminColumn"
import TableData from "@/components/common/base/TableData"
import TablePagination from "@/components/common/base/TablePagination"
import { useStore } from "@/hooks/useStore"
import { Container } from "../container/AdminContainer"
import useAdmin from "../hooks/useAdmin"

export default function AdminPage() {
    const { pageIndex, pageSize, setPagination } = useStore()
    const { useGetAllAdmin } = useAdmin()
    const { data, loading, metadata } = useGetAllAdmin()
    
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <>
            <Container>
                <TableData
                    loading={loading}
                    table={table}
                    pagination={<TablePagination
                        table={table}
                        totalCount={metadata?.totalCount} />}
                />
            </Container>
        </>
    )
}