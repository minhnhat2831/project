import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useArticleData } from "../hooks/useArticleData"
import { ArticleColumns as columns } from "../components/ArticleColumns"
import { Container } from "../container/Container"
import TableData from "@/components/common/base/TableData"
import TablePagination from "@/components/common/base/TablePagination"
import { useStore } from "@/hooks/useStore"
import { useRefetchData } from "@/hooks/useRefetch"
import { useEffect } from "react"

export default function ArticlePage() {
    const { data, loading, metadata, refetch } = useArticleData()
    const { pageIndex, pageSize, setPagination, resetData } = useStore()
    const { setRefetch } = useRefetchData()

    useEffect(() => {
        resetData?.()
        setRefetch(refetch)
    }, [resetData])

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