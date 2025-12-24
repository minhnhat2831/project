import { Outlet } from "react-router";
import SideBar from "./Sidebar";
import { ToastContainer } from "react-toastify";
import Header from "./Header";

export default function AdminLayout(){
    return(<>
        <SideBar />
        <div className="ml-60">
                <main className="pt-15">
                    <Outlet />
                </main>
            </div>
        <ToastContainer style={{ zIndex: 99999 }} />
    </>)
}