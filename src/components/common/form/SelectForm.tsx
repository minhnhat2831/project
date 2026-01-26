import { Controller, type Control, type FieldValues } from "react-hook-form";
import Select, { type GroupBase, type OptionsOrGroups } from "react-select";

interface BaseSelectProps {
    label?: string;
    error?: any;
    name: string;
    options?: OptionsOrGroups<
        { value: string ; label: string },
        GroupBase<{ value: string ; label: string}>
    >;
    control: Control<FieldValues>;
    isLoading?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    placeholder?: string;
    className?: string;
    isDisabled?: boolean;
}

type Option = { value: string; label: string };

function isOption(
    opt: Option | GroupBase<Option>
): opt is Option {
    return "value" in opt;
}

function flattenOptions(
    options?: OptionsOrGroups<Option, GroupBase<Option>>
): Option[] {
    if (!options) return [];
    return options.flatMap(opt =>
        isOption(opt) ? [opt] : opt.options
    );
}

export default function SelectForm({
    label,
    error,
    options,
    name,
    control,
    isLoading = false,
    isClearable = true,
    isSearchable = true,
    className,
    isDisabled = false,
}: BaseSelectProps) {
    const flatOptions = flattenOptions(options);

    return (
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
                    if (!field.value && flatOptions.length === 1) {
                        field.onChange(flatOptions[0].value);
                    }
                    return (
                        <Select
                            className={`w-100 border rounded-sm ${className}`}
                            options={options}
                            isLoading={isLoading}
                            isSearchable={isSearchable}
                            isClearable={isClearable}
                            isDisabled={isDisabled}
                            value={flatOptions.find(opt => opt.value === field.value) ?? null}
                            onChange={(option) => {
                                field.onChange(option?.value ?? null)
                            }
                            }
                        />
                    );
                }}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}
