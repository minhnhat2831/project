import type { PropsWithChildren } from "react";
import CashTransactionModal from "../components/modal/CashTransactionModal";

export default function Container({children} : PropsWithChildren){
    return(<>
        <CashTransactionModal />
        {children}
    </>)
}