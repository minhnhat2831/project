import { Controller, type Control, type FieldValues } from "react-hook-form";
import InputField from "../baseForm/Input";

interface BaseInputProps {
    label?: string,
    error?: any,
    name: string,
    control: Control<FieldValues>,
    type?: string,
    onValueChange?: (value: string | number | null) => void;
}

export default function InputForm({
    label,
    error,
    name,
    control,
    type,
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
                        <InputField
                            variant="form"
                            type={type}
                            className="ml-auto"
                            inputSize="md"
                            value={field.value}
                            onChange={e => {
                                const value = e.target.value ?? null;
                                if (type === "number") {
                                    onValueChange?.(value);
                                    field.onChange(Number(e.target.value))
                                } else {
                                    onValueChange?.(value);
                                    field.onChange(e.target.value)
                                }
                            }}>
                        </InputField>
                    );
                }}
            />
            {error && <p className="text-red-500 text-sm px-4 mt-1">{error}</p>}
        </div>
    </>)
}