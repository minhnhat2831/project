import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "@/components/common/TableData";
import Header from "@/layouts/Header";
import { columns } from "../components/model/DoulaColumns"
import { useDouleFetch } from "../hooks/useDoulaFetch";
import TablePagination from "@/components/common/TablePagination";
import { usePaginationStore } from "@/hooks/usePageStore";
import { useNavigate } from "react-router";
import { useFilterStore } from "@/hooks/useFilterStore";
import { useState } from "react";
import PopupCE from "@/components/common/PopupCE";
import DoulaEdit from "../components/model/DoulaEdit";
import type { Doula } from "../types/admin-doula/AdminDoulaId";

export default function DoulaPage() {
    const nav = useNavigate()
    const { pageIndex, pageSize, setPagination } = usePaginationStore()
    const page = pageIndex + 1
    const limit = pageSize
    const search = useFilterStore(state => state.search)
    const setSearch = useFilterStore(state => state.setSearch)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedDoula, setSelectedDoula] = useState<Doula | null>(null)
    const { data, loading, metadata, refetch } = useDouleFetch(page, limit, search)
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        meta: {
            onView: (doula: Doula) => {
                nav(`/admin/doulas/${doula.id}`)
            },
            onEdit: (doula: Doula) => {
                setSelectedDoula(doula)
                setOpenEdit(true)
            },
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

        <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
            {selectedDoula && (
                <DoulaEdit
                    open={openEdit}
                    setOpen={setOpenEdit}
                    doula={selectedDoula}
                    onSuccess={refetch}
                />
            )}
        </PopupCE>

        <TableData
            loading={loading}
            table={table}
            pagination={<TablePagination 
                table={table} 
                totalCount={metadata?.totalCount} />}
        />

    </>)
}