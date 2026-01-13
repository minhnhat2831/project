import { useStore } from "@/hooks/useStore";
import Container from "../container/Container";
import { useCategoryData } from "../hooks/useCategoryData";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../components/CategoryColumns";
import { useRefetchData } from "@/hooks/useRefetch";
import { useEffect } from "react";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";

export default function CategoryPage() {
    const { pageIndex, pageSize, setPagination, resetData } = useStore();
    const { data, loading, metadata, refetch } = useCategoryData()
    const { setRefetch } = useRefetchData()

    useEffect(() => {
        resetData?.()
        setRefetch(refetch)
    },[setRefetch])

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