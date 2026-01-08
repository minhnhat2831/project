export const inputVariants = {
    base: 'border h-10 pl-2 pr-2 rounded shadow-md ',
    size: {
        sm: "w-12",
        md: "w-fit",
        lg: "w-full"
    },
    variant: {
        form: "focus:outline focus:outline-green-300",
        search: "focus:outline focus:outline-sky-500",
        disable: "bg-gray-200"
    }
} as const