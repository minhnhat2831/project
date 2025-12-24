import { useParams } from "react-router"
import { useDoulaPackage } from "../../hooks/useDoulaPackageFetch"
import { usePaginationStore } from "@/hooks/usePageStore"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { columns } from "../../components/model/DoulaPackageColumns"
import TableData from "@/components/common/TableData"
import TablePagination from "@/components/common/TablePagination"

export default function DoulaPackages(){
    const { pageIndex, pageSize, setPagination } = usePaginationStore()
    const { id } = useParams<{ id?: string }>()
    const page = pageIndex + 1
    const limit = pageSize
    const {data, loading, metadata} = useDoulaPackage(page, limit, id)
    const table = useReactTable({
            data,
            columns,
            state: {
                pagination: { pageIndex, pageSize },
            },
            manualPagination: true,
            pageCount: metadata?.totalPages ?? 0,
            onPaginationChange: setPagination,
            getCoreRowModel: getCoreRowModel()
        })
    return(<>
        <TableData
            loading={loading}
            table={table}
            pagination={<TablePagination table={table} totalCount={metadata?.totalCount}/>}
        />
    </>)
}