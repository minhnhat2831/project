import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Container from "../container/Container";
import { useStore } from "@/hooks/useStore";
import TableData from "@/components/common/base/TableData";
import { useList } from "../hooks/useListData";
import { columns } from "../components/table/TransactionColumns"
import TablePagination from "@/components/common/base/TablePagination";

export default function CashTransactionPage() {
    const { useGetList } = useList()
    const { data, isLoading } = useGetList()
    const { pageIndex, pageSize, setPagination } = useStore()

    const table = useReactTable({
        data : data?.data ?? [],
        columns,
        state: {
            pagination: { pageIndex, pageSize }
        },
        manualPagination: true,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel()
    })
    return (<>
        <Container>
            <TableData
                table={table}
                loading={isLoading}
                pagination={<TablePagination table={table} totalCount={25} />}
            />
        </Container>
    </>)
}