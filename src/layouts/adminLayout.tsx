import { Outlet } from "react-router";
import SideBar from "./sideBar";

export default function AdminLayout(){
    return(<>
        <SideBar />
        <main>
            <Outlet />
        </main>
    </>)
}