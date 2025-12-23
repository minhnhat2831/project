import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "@/components/common/TableData";
import Header from "@/layouts/Header";
import { columns } from "../components/model/DoulaColumns"
import { useDouleFetch } from "../hooks/useDoulaFetch";
import TablePagination from "@/components/common/TablePagination";
import { usePaginationStore } from "@/hooks/usePageStore";
import type { AdminDoula } from "../types/adminDoula/AdminDoula";
import { useNavigate } from "react-router";
import { useFilterStore } from "@/hooks/useFilterStore";

export default function DoulaPage() {
    const nav = useNavigate()
    const { pageIndex, pageSize, setPagination } = usePaginationStore()
    const page = pageIndex + 1
    const limit = pageSize
    const search = useFilterStore(state => state.search)
    const setSearch = useFilterStore(state => state.setSearch)
    const { data, loading, metadata } = useDouleFetch(page, limit, search)
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        meta: {
            onView: (doula: AdminDoula) => {
            nav(`/admin/doulas/${doula.id}`)
            },
            // onEdit: (admin: Admin) => {
            //     setSelectedAdmin(admin)
            //     setOpenEdit(true)
            // },
            // onDelete: (admin: Admin) => {
            //     setSelectedAdmin(admin)
            //     setconfirm(true)
            // }
            },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
    })
    return (<>
        <Header href="/admin/doulas" childrenHref="Admin / Doula Management" searchValue={search} onSearchChange={setSearch} />
        <TableData
            loading={loading}
            table={table}
            pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
        >
        </TableData>
    </>)
}