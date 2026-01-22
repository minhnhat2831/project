import { useNavigate, useParams } from "react-router";
import Header from "@/layouts/Header";
import { Icons } from "@/components/common/base/Icon";
import Nav from "../components/common/Nav";
import DoulaInformation from "./tab-content/DoulaInformation";
import DoulaSubscription from "./tab-content/DoulaSubscription";
import DoulaPackages from "./tab-content/DoulaPackages";
import DoulaReviews from "./tab-content/DoulaReviews";
import { formatDate } from "@/components/common/base/FormatDate";
import Avatar from "@mui/material/Avatar";
import { useDoulaStore } from "../store/useSelectedDoula";
import { useModalStore } from "@/hooks/useModalStore";
import { Container } from "../container/Container";
import { useState } from "react";
import useDoula from "../hooks/useDoula";

const tabs = [
    { name: "Information", key: "information" },
    { name: "Subscription", key: "subscription" },
    { name: "Packages", key: "packages" },
    { name: "Reviews", key: "reviews" },
];

export default function DoulaViewPage() {
    const { id } = useParams<{ id: string }>()
    const nav = useNavigate()
    const [activeTab, setActiveTab] = useState("information");
    const { useDoulaDetail } = useDoula()
    const { data: doula } = useDoulaDetail(id);
    const { selectedDoula } = useDoulaStore()
    const { setOpen, setTypeMode } = useModalStore()

    const handleEdit = () => {
        selectedDoula?.id == doula?.id
        setTypeMode("edit")
        setOpen(true)
    }

    return (<>
        <Container>
            <Header href={`/admin/doulas/${id}`} childrenHref={`Account / Doula Management /${doula?.user.fullName}`} hidden={"hidden"} />

            <div className="w-full h-screen py-2 px-5 bg-gray-100">
                <div className="flex justify-between px-2 py-4">
                    <button className="cursor-pointer" onClick={() => nav("/admin/doulas")}><Icons.ArrowBack />Back</button>
                    <button className="cursor-pointer" onClick={handleEdit}><Icons.Pen className="text-red-400" />Edit</button>
                </div>
                <div className="px-2 py-2 bg-white">
                    {/* info */}
                    <div className="overflow-auto text-wrap bg-gray-100 px-5 py-5">
                        <div className="flex gap-10 py-2 px-5 text-nowrap">
                            <Avatar src={doula?.picture?.uri} alt="avatar" className="rounded-full w-15 h-10"></Avatar>
                            <div>
                                <p>Full Name</p>
                                <p>{doula?.user?.fullName}</p>
                            </div>
                            <div>
                                <p>Status</p>
                                <div className="flex items-baseline">
                                    <span
                                        className={`h-2 w-2 flex mr-1 items-center rounded-full ${doula?.status === "active" ? "bg-green-400" : "bg-gray-400"
                                            }`}
                                    ></span>
                                    <p>{doula?.status === "active" ? "Active" : "Inactive"}</p>
                                </div>
                            </div>
                            <div>
                                <p>Email</p>
                                <p>{doula?.user.email}</p>
                            </div>
                            <div>
                                <p>Phone</p>
                                <p>{doula?.user.phoneNumber}</p>
                            </div>

                            <div>
                                <p>Birthday</p>
                                <p>{formatDate(doula?.user.birthDate)}</p>
                            </div>
                            <div>
                                <p>Address</p>
                                <p>{doula?.address.fullAddress}</p>
                            </div>

                            <div>
                                <p>Business name</p>
                                <p>{doula?.businessName ? doula?.businessName : "-"}</p>
                            </div>
                        </div>

                        <div className="px-5 ml-20">
                            <p>About Doulas</p>
                            <p>{doula?.description ? doula?.description : "-"}</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-between lg:justify-start lg:gap-16 items-center py-4 px-2 border-b">
                        {tabs.map((tab) => (
                            <button key={tab.key} onClick={() => setActiveTab(tab.key)}>
                                <Nav active={activeTab === tab.key}>
                                    {tab.name}
                                </Nav>
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="mt-6">
                        {activeTab === "information" && <DoulaInformation />}
                        {activeTab === "subscription" && <DoulaSubscription />}
                        {activeTab === "packages" && <DoulaPackages />}
                        {activeTab === "reviews" && <DoulaReviews />}
                    </div>

                </div>
            </div>
        </Container>
    </>)
}