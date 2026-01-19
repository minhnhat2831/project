import { icons } from "@/components/common/base/Icon";
import Header from "@/layouts/Header";
import { useNavigate, useParams } from "react-router";
import { formatDate } from "@/components/common/base/FormatDate";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../components/columns/DoulaPackageDetailColumns";
import TableData from "@/components/common/base/TableData";
import TablePagination from "@/components/common/base/TablePagination";
import useDoulaPackage from "../hooks/useDoulaPackage";

export default function PackagePage() {
    const { id } = useParams<{ id: string }>()
    const nav = useNavigate()
    const { useDoulaPakageDetail } = useDoulaPackage()
    const { data: packageData, loading } = useDoulaPakageDetail(id)
    const table = useReactTable({
        data: packageData?.cares ?? [],
        columns,
        manualPagination: true,
        getCoreRowModel: getCoreRowModel()
    })

    return (<>
        <Header href={`/admin/package/${id}`} childrenHref={`Package / ${id}`} />

        <div className="w-full h-screen py-2 px-5 bg-gray-100">
            <div className="flex justify-between px-2 py-4">
                <button className="cursor-pointer" onClick={() => nav("/admin/doulas")}><icons.ArrowBack />Back</button>
                <button className="cursor-pointer" ><icons.Pen className="text-red-400" />Edit</button>
            </div>
            <div className="px-2 py-2 bg-white">
                {/* info */}
                <div className="overflow-auto bg-gray-100 px-5 py-5">
                    <p className="font-bold ml-5">Package Information</p>
                    <div className="flex gap-10 py-2 px-5 text-nowrap">
                        <div>
                            <p className="font-bold">Cover Photo</p>
                            <img src={packageData?.picture?.uri} alt={`pic` + packageData?.picture?.id} width={50} height={50}></img>
                        </div>
                        <div>
                            <p className="font-bold">Package Name</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: packageData?.name || ""
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-bold">Short Description</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: packageData?.shortDescription || ""
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-bold">Price</p>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: packageData?.price || ""
                                }}
                            />
                        </div>
                        <div>
                            <p className="font-bold">Created date</p>
                            <span>{formatDate(packageData?.createdAt)}</span>
                        </div>
                    </div>
                    <div className="px-5">
                        <p className="font-bold">What's Included</p>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: packageData?.description || ""
                            }}
                        />
                    </div>
                </div>
            </div>
            <TableData table={table} loading={loading} pagination={<TablePagination table={table} />} />
        </div>
    </>)
}