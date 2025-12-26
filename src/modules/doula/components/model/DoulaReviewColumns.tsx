import type { ColumnDef } from "@tanstack/react-table";
import type { DoulaReview } from "../../types/doula-review/DoulaReview";
import { formatDate } from "@/components/common/FormatDate";
import { Icons } from "@/components/common/Icon";
import Avatar from "@mui/material/Avatar";

export const columns: ColumnDef<DoulaReview>[] = [
    {
        accessorKey: "user?.picture",
        header: "Avatar",
        cell: ({ getValue }) => {
            const avatar = getValue<string>()
            return avatar ? (
                <Avatar
                    src={avatar}
                    className="w-10 h-10 rounded-full"
                />
            ) : (
                <Avatar />
            );
        }
    },
    {
        accessorKey: "user?.fullName",
        header: "Full Name"
    },
    {
        accessorKey: "start",
        header: "Rating"
    },
    {
        accessorKey: "comment",
        header: "Comment"
    },
    {
        accessorKey: "createdAt",
        header: "Date",
        cell: ({ getValue }) => {
            const date = getValue<string>()
            return <div>{formatDate(date)}</div>
        }
    },
    {
        id: "action",
        header: "Action",
        cell: ({ }) => {
            return (
                <div className="flex gap-3">
                    <button>
                        <Icons.Eye className="text-red-400 cursor-pointer" />
                    </button>
                </div>
            )
        },
    }
]