import InputField from "../components/common/Input";
import { type ReactNode } from "react";

interface prop {
    href?: string | undefined, 
    childrenHref?: string  | null, 
    children? : ReactNode | null
}
export default function Header({ href, childrenHref, children}: prop) {

    return (<>
        <div className="fixed top-0 left-60 right-0 h-15 border flex justify-between items-center z-50 bg-white">
            <div className="flex items-center gap-8 p-5">
                <a href={href}>{childrenHref}</a>
                <InputField
                    placeholder="Search">
                </InputField>
            </div>
            {children}
        </div>
    </>)
}
