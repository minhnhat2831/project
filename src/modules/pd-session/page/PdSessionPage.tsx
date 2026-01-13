import TableData from "@/components/common/base/TableData"
import TablePagination from "@/components/common/base/TablePagination"
import { useRefetchData } from "@/hooks/useRefetch"
import { useStore } from "@/hooks/useStore"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useEffect } from "react"
import { Container } from "../container/Container"
import { columns } from "../components/PdColumns"
import { usePdData } from "../hooks/usePdData"

export default function PdSessionPage() {
    const { data, loading, metadata, refetch } = usePdData()
    const { pageIndex, pageSize, setPagination, resetData } = useStore()
    const { setRefetch } = useRefetchData()

    useEffect(() => {
        resetData?.()
        setRefetch(refetch)
    }, [setRefetch])

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