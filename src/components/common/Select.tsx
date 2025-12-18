import type { ReactNode } from "react";

interface props {
    label : string,
    children : ReactNode
    error?: string;
}

export default function Select({children,label,error,...rest} : props){
    return(<>
        <div className="px-2">
            {label && <label className="block mb-1">{label}<span className="text-red-500">*</span></label>}
            <select className="border w-full h-10 pl-2 pr-2 rounded" 
            {...rest}>
                {children}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    </>)
}