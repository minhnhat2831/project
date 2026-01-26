import { Controller, type Control, type FieldValues } from "react-hook-form";
import InputField from "./Input";

interface BaseInputProps {
    label?: string,
    error?: any,
    type?: string,
    name: string,
    control: Control<FieldValues>
}

export default function InputForm({
    label,
    error,
    type,
    name,
    control,
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
                        <InputField variant="form"
                            type={type}
                            inputSize="md"
                            value={field.value}
                            onChange={e => {
                                if (type === "number") {
                                    field.onChange(Number(e.target.value))
                                } else {
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