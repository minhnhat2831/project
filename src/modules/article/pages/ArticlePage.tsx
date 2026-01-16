import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { ArticleColumns as columns } from "../components/ArticleColumns"
import { Container } from "../container/Container"
import TableData from "@/components/common/base/TableData"
import TablePagination from "@/components/common/base/TablePagination"
import { useStore } from "@/hooks/useStore"
import useArticleQuery from "../hooks/useArticleQuery"

export default function ArticlePage() {
    const { data, loading, metadata } = useArticleQuery()
    const { pageIndex, pageSize, setPagination } = useStore()

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