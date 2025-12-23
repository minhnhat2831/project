import { useNavigate, useParams } from "react-router";
import Header from "@/layouts/Header";
import { Icons } from "@/components/common/Icon";
import Nav from "../components/common/Nav";
import pic from "@/assets/warning.jpg"
import Information from "./tab_content/Information";
import Subscription from "./tab_content/Subscription";
import Packages from "./tab_content/Packages";
import Reviews from "./tab_content/Reviews";
import { useState } from "react";

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

    return (<>
        <Header href={`/admin/doulas/${id}`} childrenHref={`Account / Doula Management /s`} />

        <div className="w-full h-screen py-2 px-5 bg-gray-100">
            <div className="flex justify-between px-2 py-4">
                <button className="cursor-pointer" onClick={() => nav("/admin/doulas")}><Icons.ArrowBack />Back</button>
                <button className="cursor-pointer"><Icons.Pen className="text-red-400" />Edit</button>
            </div>
            <div className="px-2 py-2 bg-white">
                {/* info */}
                <div className="overflow-auto text-wrap bg-gray-200">
                    <div className="flex gap-10 py-2">
                        <img src={pic} alt="avatar" className="rounded-full w-10 h-10 ml-5"></img>
                        <p>Full Name</p>
                        <p>Status</p>
                        <p>Email</p>
                        <p>Phone</p>
                        <p>Birthday</p>
                        <p>Address</p>
                        <p>Business name</p>
                    </div>

                    <div className="px-5">
                        <p>About Doulas</p>
                        <p>-</p>
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
                    {activeTab === "information" && <Information />}
                    {activeTab === "subscription" && <Subscription />}
                    {activeTab === "packages" && <Packages />}
                    {activeTab === "reviews" && <Reviews />}
                </div>

            </div>
        </div>
    </>)
}