import { Outlet } from "react-router";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";

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