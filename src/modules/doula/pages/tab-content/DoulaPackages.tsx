import { useNavigate, useParams } from "react-router"
import { getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { columns } from "../../components/columns/DoulaPackageColumns"
import TableData from "@/components/common/base/TableData"
import TablePagination from "@/components/common/base/TablePagination"
import { useStore } from "@/hooks/useStore"
import useDoulaPackage from "../../hooks/useDoulaPackage"
import type { doulaPackageDetail } from "../../schema/types/DoulaPackageSchema.type"

export default function DoulaPackages() {
    const nav = useNavigate()
    const { pageIndex, pageSize, setPagination } = useStore()
    const { id } = useParams<{ id?: string }>()
    const { useGetAllDoulaPackage } = useDoulaPackage()
    const { data, loading, metadata } = useGetAllDoulaPackage(id)
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        meta: {
            onView: (doula: doulaPackageDetail) => {
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