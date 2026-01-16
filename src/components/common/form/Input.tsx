import * as React from "react"
import { cn } from "@/lib/cn"
import { inputVariants } from "../ui/Input.style";

type InputVariant = keyof typeof inputVariants.variant
type InputSize = keyof typeof inputVariants.size

interface InputFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    variant?: InputVariant
    inputSize?: InputSize
    loading?: boolean
}

export default function InputField({
    label,
    error,
    className,
    variant = "form",
    inputSize = "md",
    loading = false,
    children,
    disabled,
    ...rest
}: InputFieldProps) {
    return (
        <div className="px-4">
            {label && <label className="block mb-1">{label}<span className="text-red-500"> *</span></label>}
            <input
                disabled={disabled || loading}
                className={cn(
                    inputVariants.base,
                    inputVariants.size[inputSize],
                    inputVariants.variant[error ? "error" : variant],
                    className
                )}
                {...rest}
            />
            {loading && (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {children}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
