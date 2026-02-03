import { Controller, type Control, type FieldValues } from "react-hook-form";
import Button from "../baseForm/Button";

interface BaseButtonProps {
    label?: string,
    error?: any,
    type?: string,
    name: string,
    control: Control<FieldValues>
    children: string
    className? : string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export default function ButtonForm({
    label,
    error,
    name,
    control,
    children,
    className,
    onClick
}: BaseButtonProps) {
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
                        <Button variant="normal"
                            type="button"
                            size="sm"
                            className={className}
                            value={field.value}
                            onChange={() => field.onChange(field.value)}
                            onClick={onClick}
                        >
                            {children}
                        </Button>
                    );
                }}
            />
            {error && <p className="text-red-500 text-sm px-4 mt-1">{error}</p>}
        </div>
    </>)
}