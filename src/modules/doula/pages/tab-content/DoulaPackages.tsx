import { useNavigate, useParams } from "react-router"
import { useDoulaPackage } from "../../hooks/useDoulaPackageFetch"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { columns } from "../../components/model/DoulaPackageColumns"
import TableData from "@/components/common/TableData"
import TablePagination from "@/components/common/TablePagination"
import type { DoulaPackageId } from "../../types/doula-package/DoulaPackageId"
import { useStore } from "@/hooks/useStore"

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
            onView: (doula: DoulaPackageId) => {
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