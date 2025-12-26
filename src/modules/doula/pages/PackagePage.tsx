import { Icons } from "@/components/common/Icon";
import Header from "@/layouts/Header";
import { useNavigate, useParams } from "react-router";
import { usePackageFetch } from "../hooks/usePackageFetch";
import { formatDate } from "@/components/common/FormatDate";

export default function PackagePage() {
    const { id } = useParams<{ id: string }>()
    const nav = useNavigate()
    const { data: packageData } = usePackageFetch(id)
    return (<>
        <Header href={`/admin/package/${id}`} childrenHref={`Package / ${id}`} />

        <div className="w-full h-screen py-2 px-5 bg-gray-100">
            <div className="flex justify-between px-2 py-4">
                <button className="cursor-pointer" onClick={() => nav("/admin/doulas")}><Icons.ArrowBack />Back</button>
                <button className="cursor-pointer" ><Icons.Pen className="text-red-400" />Edit</button>
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
        </div>
    </>)
}