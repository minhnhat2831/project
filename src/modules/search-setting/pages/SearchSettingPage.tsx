import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Container from "../container/Container";
import { columns } from "../components/SearchSettingColumns";
import { useStore } from "@/hooks/useStore";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import useSearchSetting from "../hooks/useSearchSetting";

export default function SearchSettingPage() {
    const { useGetAllSearchSetting } = useSearchSetting()
    const { data, loading, metadata } = useGetAllSearchSetting()
    const { pageIndex, pageSize, setPagination } = useStore()


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
                table={table}
                loading={loading}
                pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
            />
        </Container>
    </>)
}