import { Outlet } from "react-router";
import SideBar from "./Sidebar";

export default function AdminLayout(){
    return(<>
        <SideBar />
        <main className="ml-60">
            <Outlet />
        </main>
    </>)
}