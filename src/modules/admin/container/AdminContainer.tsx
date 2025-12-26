import type React from "react";
import AdminModal from "../components/AdminModal";

export const Container = ({children} : React.PropsWithChildren) => {
    return (<>
        <AdminModal />
        {children}
    </>
    )
}