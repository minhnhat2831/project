import { Icons } from "@/components/common/base/Icon";
import Header from "@/layouts/Header";
import { useNavigate, useParams } from "react-router";
import { useVoucherId } from "../hooks/useVoucherId";
import { formatDate } from "@/components/common/base/FormatDate";
import useDoulaVoucherData from "../hooks/useDoulaVoucherData";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../components/DoulaVoucherColumns";
import { useStore } from "@/hooks/useStore";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";

export default function VoucherViewPage() {
    const { id } = useParams<{ id: string }>()
    const nav = useNavigate()
    const { data: voucherId } = useVoucherId(id)
    const { pageIndex, pageSize } = useStore()
    const { data, loading, metadata } = useDoulaVoucherData(id)
    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        manualPagination: true,
        pageCount: metadata?.totalPages ?? 0,
        getCoreRowModel: getCoreRowModel(),
    })
    return (<>
        <Header href={`/admin/voucher/${id}`} childrenHref={`Voucher /${id}`} />

        <div className="w-full h-screen py-2 px-5 bg-gray-100">
            <div className="flex justify-between px-2 py-4">
                <button className="cursor-pointer" onClick={() => nav("/admin/voucher")}><Icons.ArrowBack />Back</button>
            </div>
            <div className="px-2 py-2 bg-white">
                <div className="font-bold">
                    <p>Voucher Information</p>
                </div>
                {/* info */}
                <div className="overflow-auto text-wrap bg-gray-100 px-5 py-5">
                    <div className="flex gap-10 py-2 px-5 text-nowrap">
                        <div>
                            <p>Code</p>
                            <p className="font-bold">{voucherId?.code}</p>
                        </div>
                        <div>
                            <p>Start Date</p>
                            <p className="font-bold">{formatDate(voucherId?.startDate)}</p>
                        </div>
                        <div>
                            <p>End Date</p>
                            <p className="font-bold">{formatDate(voucherId?.endDate)}</p>
                        </div>

                        <div>
                            <p>Number of Use</p>
                            <p className="font-bold">{voucherId?.numOfUsed}</p>
                        </div>
                        <div>
                            <p>Type of coupon</p>
                            <p className="font-bold">{voucherId?.type}</p>
                        </div>

                        <div>
                            <p>Amount</p>
                            <p className="font-bold">%{voucherId?.amount}</p>
                        </div>
                        <div>
                            <p>Condition</p>
                            <p className="font-bold">${voucherId?.minPayAmount}</p>
                        </div>
                        <div>
                            <p>Max Discount Amount</p>
                            <p className="font-bold">${voucherId?.maxDiscountAmount}</p>
                        </div>
                    </div>

                    <div className="px-5">
                        <p>Description</p>
                        <p className="font-bold">{voucherId?.description}</p>
                    </div>
                </div>
            </div>

            <TableData
                table={table}
                loading={loading}
                pagination={<TablePagination table={table} totalCount={metadata?.totalCount} />}
            />
        </div>


    </>)
}
