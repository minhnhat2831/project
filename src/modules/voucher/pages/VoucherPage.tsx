import { useRefetchData } from "@/hooks/useRefetch";
import { Container } from "../container/Container";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../components/VoucherColumns";
import { useStore } from "@/hooks/useStore";
import TableData from "@/components/common/TableData";
import TablePagination from "@/components/common/TablePagination";
import { useEffect } from "react";
import { useVoucherData } from "../hooks/useVoucherData";

export default function VoucherPage() {
    const { data, loading, metadata, refetch } = useVoucherData()
    const { setRefetch } = useRefetchData()
    const { pageIndex, pageSize, setPagination } = useStore()

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
            <TableData 
                table={table}
                loading={loading}
                pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}/>
        </Container>
    </>)
}