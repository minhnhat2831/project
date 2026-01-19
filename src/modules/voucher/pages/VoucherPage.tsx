import { Container } from "../container/Container";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../components/columns/VoucherColumns";
import { useStore } from "@/hooks/useStore";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import useVoucher from "../hooks/useVoucher";

export default function VoucherPage() {
    const { useGetAllVoucher } = useVoucher()
    const { data, loading, metadata } = useGetAllVoucher()
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
    
    return (<>
        <Container>
            <TableData 
                table={table}
                loading={loading}
                pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}/>
        </Container>
    </>)
}