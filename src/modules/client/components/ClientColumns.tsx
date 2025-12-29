import type { ColumnDef } from "@tanstack/react-table";
import type { Client } from "../types/client/Client";
import { Icons } from "@/components/common/Icon";
import { formatDate } from "@/components/common/FormatDate";
import Avatar from "@mui/material/Avatar";
import { useClientStore } from "../store/useSeletedClient";
import { useNavigate } from "react-router";
import { useModalStore } from "@/hooks/useModalStore";

export const columns: ColumnDef<Client>[] = [
    {
        accessorKey: "picture.uri",
        header: "Avatar",
        cell: ({ getValue }) => {
            const src = getValue() as string | null;

            return src ? (
                <Avatar
                    src={src}
                    className="w-10 h-10 rounded-full"
                />
            ) : (
                <Avatar />
            );
        },
    },
    {
        accessorKey: "fullName",
        header: "Full name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone",
        cell: ({ getValue, row }) => {
            const client = row.original
            const phone = getValue<string>()
            const countryCode = client.countryCode
            return <div>{countryCode} {phone}</div>
        }
    },
    {
        accessorKey: "birthDate",
        header: "birthDate",
        cell: ({ getValue }) => {
            const birthday = getValue<Date>()
            return <div>{formatDate(birthday)}</div>
        }
    },
    {
        accessorKey: "address.fullAddress",
        header: "Address"
    },
    {
        accessorKey: "createdAt",
        header: "createdAt",
        cell: ({ getValue }) => {
            const createdAt = getValue<Date>()
            return <div>{formatDate(createdAt)}</div>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue<string>()
            return (
                <div className="flex items-center gap-2">
                    <span
                        className={`h-2 w-2 rounded-full ${status === "active" ? "bg-green-400" : "bg-gray-400"
                            }`}
                    ></span>
                    {status === "active" ? "Active" : "Inactive"}
                </div>
            )
        },
    },
    {
        id: "action",
        header: "Action",
        cell: ({ row }) => {
            const client = row.original;
            const nav = useNavigate();
            const { setSelectedClient } = useClientStore();
            const { setOpenEdit, setConfirm } = useModalStore()
            const handleView = () => {
                setSelectedClient(client)
                nav(`/admin/clients/${client.id}`)
            }

            const handleEdit = () => {
                setSelectedClient(client)
                setOpenEdit(true)
            }

            const handleDelete = () => {
                setSelectedClient(client)
                setConfirm(true)
            }
            return (
                <div className="flex gap-3">
                    <button onClick={handleView}>
                        <Icons.Eye className="text-red-400 cursor-pointer" />
                    </button>
                    <button onClick={handleEdit}>
                        <Icons.Pen className="text-red-400 cursor-pointer" />
                    </button>
                    <button onClick={handleDelete}>
                        <Icons.Trash className="text-gray-600 cursor-pointer" />
                    </button>
                </div>
            )
        },
    },
]