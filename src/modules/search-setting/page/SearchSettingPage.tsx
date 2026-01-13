import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Container from "../container/Container";
import { columns } from "../components/SearchSettingColumns";
import { useSearchSettingData } from "../hooks/useSearchSettingData";
import { useStore } from "@/hooks/useStore";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import { useRefetchData } from "@/hooks/useRefetch";
import { useEffect } from "react";
export default function SearchSettingPage(){
    const { data, loading, metadata, refetch } = useSearchSettingData()
    const { pageIndex, pageSize, setPagination, resetData } = useStore()
    const { setRefetch } = useRefetchData()

    useEffect(() => {
        resetData?.()
        setRefetch(refetch)
    },[setRefetch])
    
    const table = useReactTable({
        data,
        columns,
        state : {
            pagination : { pageIndex, pageSize}
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange : setPagination,
        getCoreRowModel : getCoreRowModel()
    })
    return(<>
        <Container>
            <TableData 
                table={table}
                loading={loading}
                pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
            />
        </Container>
    </>)
}