import { Icons } from '../components/common/Icon';
import { ROUTER_SIDEBAR } from "../constants/router";
import NavTo from "../components/common/NavLink";
import { useState } from "react";
import Popup from "../modules/auth/components/Popup";
import { useNavigate } from 'react-router';


export default function SideBar() {
    const [open, setOpen] = useState(false)
    const nav = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        nav("/")
    }

    return (<>
        <div className="w-60 h-full border fixed z-10 bg-white">
            <div className="w-full h-1/12 border flex justify-between items-center px-3 bg-[#390099]">
                <div className="text-white font-bold"><p>NurtureWave</p></div>
                <div><Icons.Menu className='text-white' /></div>
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
                <button
                    onClick={() => setOpen(true)}
                    className="hover:bg-gray-400 rounded-full p-1"
                >
                    <Icons.Menu />
                </button>
                <Popup open={open} onOpenChange={setOpen}>
                    <button
                        className="w-full text-left text-red-500 hover:bg-gray-200 px-2 py-1 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </Popup>
            </div>
        </div>
    </>)
}