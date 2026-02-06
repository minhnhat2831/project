import { Icons } from "@/components/common/base/Icon";
import Header from "@/layouts/Header";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useParams } from "react-router";
import { formatDateTime } from "@/components/common/base/FormatDate";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../components/PackageColumns";
import { useStore } from "@/hooks/useStore";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import { useClientStore } from "../store/useSelectedClient";
import { useModalStore } from "@/hooks/useModalStore";
import { Container } from "../container/Container";
import { useCare } from "../hooks/useCare";
import useClient from "../hooks/useClient";

export default function ClientViewPage() {
    const nav = useNavigate()
    const { id } = useParams<{ id: string }>()
    const { useClientDetail } = useClient()
    const { data: cares, loading, metadata } = useCare(id)
    const { data: client } = useClientDetail(id)
    const { pageIndex, pageSize, setPagination } = useStore()
    const { selectedClient } = useClientStore()
    const { setOpen, setTypeMode } = useModalStore()

    const table = useReactTable({
        data: cares,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
    })

    const handleEdit = () => {
        selectedClient?.id == client?.id
        setTypeMode("edit")
        setOpen(true)
    }
    return (<>
        <Container>
            <Header href={`/admin/client/${client?.id}`} childrenHref={`Admin / Client Management / ${client?.id}`} hidden={"hidden"} />
            <div className="w-full h-screen py-2 px-5 bg-gray-100">
                <div className="flex justify-between px-2 py-4">
                    <button className="cursor-pointer" onClick={() => nav('/admin/clients')}><Icons.ArrowBack />Back</button>
                    <button className="cursor-pointer" onClick={handleEdit}><Icons.Pen className="text-red-500" />Edit</button>
                </div>
                <div className="px-2 py-2 bg-white">
                    {/* info */}
                    <div className="flex gap-8 px-2 py-2 text-nowrap overflow-y-auto">
                        <Avatar src={client?.picture?.uri} />
                        <div>
                            <p>Full Name</p>
                            <p>{client?.fullName}</p>
                        </div>
                        <div>
                            <p>Status</p>
                            <div className="flex items-baseline">
                                <span
                                    className={`h-2 w-2 flex mr-1 items-center rounded-full ${client?.status === "active" ? "bg-green-400" : "bg-gray-400"
                                        }`}
                                ></span>
                                <p>{client?.status === "active" ? "Active" : "Inactive"}</p>
                            </div>
                        </div>
                        <div>
                            <p>Email</p>
                            {client?.email}
                        </div>
                        <div>
                            <p>Phone</p>
                            {client?.countryCode} {client?.phoneNumber}
                        </div>
                        <div>
                            <p>Birthday</p>
                            {formatDateTime(client?.birthDate)}
                        </div>
                        <div>
                            <p>Address</p>
                            {client?.address?.fullAddress}
                        </div>
                    </div>

                </div>

                <TableData
                    loading={loading}
                    table={table}
                    pagination={<TablePagination table={table} totalCount={metadata?.totalPages} />}
                />
            </div>
        </Container>
    </>)
}