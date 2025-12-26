import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import TableData from "@/components/common/TableData";
import Header from "@/layouts/Header";
import { columns } from "../components/model/DoulaColumns"
import { useDouleFetch } from "../hooks/useDoulaFetch";
import TablePagination from "@/components/common/TablePagination";
import { useNavigate } from "react-router";
import { useState } from "react";
import PopupCE from "@/components/common/PopupCE";
import DoulaEdit from "../components/model/DoulaEdit";
import type { Doula } from "../types/admin-doula/AdminDoulaId";
import PopupConfirm from "@/components/common/PopupComfirm";
import DoulaDelete from "../components/model/DoulaDelete";
import { useStore } from "@/hooks/useStore";

export default function DoulaPage() {
    const nav = useNavigate()
    const {search , setSearch, pageIndex, pageSize, setPagination} = useStore()
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedDoula, setSelectedDoula] = useState<Doula | null>(null)
    const [confirm, setConfirm] = useState(false)
    const { data, loading, metadata, refetch } = useDouleFetch(pageIndex + 1, pageSize, search)
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
            onDelete: (doula : Doula) => {
                setSelectedDoula(doula)
                setConfirm(true)
            }
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
        <PopupConfirm open={confirm} onOpenChange={setConfirm}>
            {selectedDoula && (
                <DoulaDelete 
                    open={confirm}
                    setOpen={setConfirm}
                    doula={selectedDoula}
                    onSuccess={refetch}
                    />
            )}
        </PopupConfirm>

        <TableData
            loading={loading}
            table={table}
            pagination={<TablePagination 
                table={table} 
                totalCount={metadata?.totalCount} />}
        />

    </>)
}