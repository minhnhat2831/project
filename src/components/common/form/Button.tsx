import type { ButtonHTMLAttributes } from "react"

interface prop extends ButtonHTMLAttributes<HTMLButtonElement> {
    children : string
}

export default function Button({children,...rest} : prop){
    return(
        <button 
            {...rest}
            className="w-full rounded text-white font-bold bg-blue-700 h-9 cursor-pointer">
            {children}
        </button>
    )
}