import Select from "react-select";

export interface SelectOption {
    value: string;
    label: string;
}

interface BaseSelectProps {
    label?: string;
    error?: string;

    options: SelectOption[];
    value?: SelectOption | null;
    onChange?: (option: SelectOption | null) => void;

    isLoading?: boolean;
    isClearable?: boolean;
    placeholder?: string;
    className?: string;
    isDisabled?: boolean;
}

export default function SelectForm({
    label,
    error,
    options,
    value,
    onChange,

    isLoading = false,
    isClearable = true,
    placeholder = "Select...",
    className = "w-55",
    isDisabled = false,
}: BaseSelectProps) {
    return (
        <div className="px-4 mb-4">
            {label && <label className="block mb-2">{label}<span className="text-red-500">*</span></label>}
            <Select
                className={`w-full ${className}`}
                options={options}
                value={value}
                onChange={onChange}
                isLoading={isLoading}
                isClearable={isClearable}
                placeholder={placeholder}
                isDisabled={isDisabled}
                classNamePrefix="react-select"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
