import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "@/components/common/TableData";
import { columns } from "../components/model/DoulaColumns"
import { useDouleFetch } from "../hooks/useDoulaFetch";
import TablePagination from "@/components/common/TablePagination";
import { useStore } from "@/hooks/useStore";
import { Container } from "../container/Container";
import { useEffect } from "react";
import { useRefetchData } from "@/hooks/useRefetch";
import Header from "@/layouts/Header";

export default function DoulaPage() {
    const { pageIndex, pageSize, setPagination, search, setSearch } = useStore()
    const { data, loading, metadata, refetch } = useDouleFetch()
    const { setRefetch } = useRefetchData()

    useEffect(() => {
        setRefetch(refetch)
    },[setRefetch])
    
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