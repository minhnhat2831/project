import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function InputField({ label,error, ...rest }: InputFieldProps) {
    return (
        <div className="px-4">
            {label && <label className="block mb-1">{label}<span className="text-red-500"> *</span></label>}
            <input
                {...rest}
                className="border w-full h-10 pl-2 pr-2 rounded shadow-md"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
