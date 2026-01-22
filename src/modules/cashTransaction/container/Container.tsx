import type { PropsWithChildren } from "react";
import SearchSettingModal from "../components/modal/CashTransactionModal";

export default function Container({children} : PropsWithChildren){
    return(<>
        <SearchSettingModal />
        {children}
    </>)
}