import { useNavigate, useParams } from "react-router"
import { useDoulaPackage } from "../../hooks/useDoulaPackageFetch"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { columns } from "../../components/model/DoulaPackageColumns"
import TableData from "@/components/common/base/TableData"
import TablePagination from "@/components/common/base/TablePagination"
import { useStore } from "@/hooks/useStore"
import type { DoulaPackageDetail } from "../../schema/DoulaPackageSchema"

export default function DoulaPackages() {
    const nav = useNavigate()
    const { pageIndex, pageSize, setPagination } = useStore()
    const { id } = useParams<{ id?: string }>()
    const { data, loading, metadata } = useDoulaPackage(pageIndex + 1, pageSize, id)
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        meta: {
            onView: (doula: DoulaPackageDetail) => {
                nav(`/admin/package/${doula.id}`)
            },
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel()
    })
    return (<>
        <TableData
            loading={loading}
            table={table}
            pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
        />
    </>)
}