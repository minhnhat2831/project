import type { PropsWithChildren } from "react";
import SearchSettingModal from "../components/SearchSettingModal";

export default function Container({children} : PropsWithChildren){
    return(<>
        <SearchSettingModal />
        {children}
    </>)
}