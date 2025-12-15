import { Menu } from "lucide-react";
import { ROUTER_SIDEBAR } from "../constants/router";
import NavTo from "../component/common/navlink";
import { useState } from "react";
import Popup from "../component/common/popup";

export default function SideBar() {
    const [open , setOpen] = useState(false)

    const togglePopup = () => {
        setOpen(!open);
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = '/';
    }

    return (<>
        <div className="w-60 h-full border fixed z-999">
            <div className="w-full h-1/12 border flex justify-between items-center px-3 bg-[#390099]">
                <div className="text-white font-bold"><p>NurtureWave</p></div>
                <div><Menu color='white' /></div>
            </div>
            <div className="px-3 w-full h-5/6 overflow-y-auto">
                {ROUTER_SIDEBAR.map((router, index) => (
                    <div className=" mt-2 mb-2 w-full h-10 px-2 gap-8 rounded flex items-center hover:bg-gray-200" key={index}>
                        {router.icon}<NavTo to={router.href}>{router.name}</NavTo>
                    </div>
                ))}
            </div>
            <div className="h-1/10 flex items-center px-4 justify-between bg-purple-200">
                <div className="flex gap-2">
                    <p className="w-8 h-8 bg-gray-300 rounded-4xl text-center">A</p>
                    <p>SuperAdmin</p>
                </div>
                <button onClick={togglePopup} className="hover:bg-gray-400 rounded-4xl"><Menu /></button>
                <Popup show={open} onClose={togglePopup}>
                    <button className="w-full text-left text-red-500 hover:bg-gray-200 cursor-pointer" onClick={handleLogout}>Logout</button>
                </Popup>
            </div>
        </div>
    </>)
}