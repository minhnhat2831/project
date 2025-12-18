import Header from "../../../layouts/Header"
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from "@tanstack/react-table"
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

export default function AdminPage() {
    const { data, loading,refetch } = useAdminData()
    const [open, setOpen] = useState(false)
    const [confirm, setconfirm] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 25,
    })
    
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
                        className=" bg-indigo-500 rounded w-20 h-8 mr-5"
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
                childrenHeader={table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="border-b-2">
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className="px-3 py-4 text-left font-semibold border whitespace-nowrap"
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                    </tr>
                ))}

                childrenRow={table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="border-b">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-3 py-3 border font-serif">
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
                pagination={
                    <>
                    <div className="px-2">
                        <button
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="border w-15 rounded cursor-pointer mr-2 hover:bg-red-300"
                        >
                            Prev
                        </button>

                        <span>
                            Page {table.getState().pagination.pageIndex + 1} /{" "}
                            {table.getPageCount()}
                        </span>

                        <button
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="border w-15 rounded cursor-pointer ml-2 hover:bg-red-300"
                        >
                            Next
                        </button>
                        </div>
                    </>}
            >
            </TableData>
        </>
    )
}
