import type { ReactNode } from "react";

interface props {
    label : string,
    children : ReactNode
    error?: string;
    className? : string
}

export default function Select({children,label,error, className,...rest} : props){
    return(<>
        <div className="px-4">
            {label && <label className="block mb-2">{label}<span className="text-red-500">*</span></label>}
            <select className={`border w-full h-10 pl-2 pr-2 rounded shadow-xl ${className}`} 
            {...rest}>
                {children}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    </>)
}