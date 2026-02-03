import { Controller, type Control, type FieldValues } from "react-hook-form";
import { NumericFormat } from 'react-number-format'

interface BaseInputProps {
    label?: string,
    error?: any,
    name: string,
    control: Control<FieldValues>
    disabled?: boolean,
    className?: string,
    onValueChange?: (value: number) => void;
}

export default function NumberInputForm({
    label,
    error,
    name,
    control,
    disabled = false,
    className,
    onValueChange
}: BaseInputProps) {
    return (<>
        <div className="mt-auto">
            {label && (
                <label className="block mb-2">
                    {label}
                    <span className="text-red-500">*</span>
                </label>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <NumericFormat
                            className={`border h-10 px-4 py-4 rounded shadow-md text-md w-100 focus:outline focus:outline-green-300 hover:outline hover:outline-green-300 mb-2 mt-2 ${className}`}
                            value={field.value}
                            onValueChange={(option) => {
                                const value = option.floatValue ?? 0
                                field.onChange(value)
                                onValueChange?.(value)
                            }}
                            thousandSeparator=","
                            decimalSeparator="."
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            disabled={disabled}
                            placeholder="0.00"
                        />
                    );
                }}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    </>)
}