import Header from "../../../layouts/Header"
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { columns } from "../components/AdminColumn"
import TableData from "../../../components/common/TableData"
import { useAdminData } from "../hooks/useAdminData"
import { useState } from "react"
import PopupCE from "../../../components/common/PopupCE"
import AdminCreatePopup from "../components/AdminCreate"
import AdminEditPopup from "../components/AdminEdit"
import type { Admin } from "../types/Admin"
import PopupConfirm from "../../../components/common/PopupComfirm"
import AdminDelete from "../components/AdminDelete"
import TablePagination from "../../../components/common/TablePagination"

export default function AdminPage() {
    const [open, setOpen] = useState(false)
    const [confirm, setconfirm] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25,
    })
    const page = pagination.pageIndex + 1
    const limit = pagination.pageSize
    const { data, loading, refetch, metadata } = useAdminData(page, limit)

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        meta: {
            onEdit: (admin: Admin) => {
                setSelectedAdmin(admin)
                setOpenEdit(true)
            },
            onDelete: (admin: Admin) => {
                setSelectedAdmin(admin)
                setconfirm(true)
            }
        },
    })

    return (
        <>
            {/* Popup CUD */}
            <Header href="/admin" childrenHref="Admin / Admin Manager"
                children={
                    <>
                        <button
                            onClick={() => setOpen(true)}
                            className=" bg-indigo-500 rounded w-20 h-8 mr-5 cursor-pointer"
                        >
                            Create
                        </button>

                        <PopupCE open={open} onOpenChange={setOpen}>
                            <AdminCreatePopup open={open} setOpen={setOpen} onSuccess={refetch} />
                        </PopupCE>
                    </>
                }
            />
            <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
                {selectedAdmin && (
                    <AdminEditPopup
                        open={openEdit}
                        setOpen={setOpenEdit}
                        admin={selectedAdmin}
                        onSuccess={refetch}
                    />
                )}
            </PopupCE>
            <PopupConfirm open={confirm} onOpenChange={setconfirm}>
                {selectedAdmin && (
                    <AdminDelete
                        open={confirm}
                        setOpen={setconfirm}
                        admin={selectedAdmin}
                        onSuccess={refetch}
                    />
                )}
            </PopupConfirm>

            <TableData
                loading={loading}
                table={table}
                pagination={<TablePagination table={table} totalCount={metadata?.totalCount}/>}
            />

        </>
    )
}