import type { ReactNode } from "react"

interface props {
    label? : string,
    text? : string | number | null
    children? : ReactNode
}

export default function ConfirmField({label, text, children} : props) {
    return (<>
        <div className="flex leading-8">
            <label className="w-60 shrink-0">{label}</label>
            <p className="flex-1"> {text} {children}</p>
        </div>
    </>)
}