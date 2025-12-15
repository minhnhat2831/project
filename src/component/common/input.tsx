import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function InputField({ label,error, ...rest }: InputFieldProps) {
    return (
        <div>
            {label && <label className="block mb-1">{label}</label>}
            <input
                {...rest}
                className="border w-full h-10 pl-2 rounded"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
