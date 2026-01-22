export const inputVariants = {
    base: 'border h-10 px-4 py-4 rounded shadow-md text-md',
    size: {
        sm: "w-12",
        md: "w-fit",
        lg: "w-full"
    },
    variant: {
        form: "focus:outline focus:outline-green-300 hover:outline hover:outline-green-300 mb-2 mt-2",
        search: "focus:outline focus:outline-sky-500",
        disable: "bg-gray-200 mb-4 mt-1",
        error: "border-red-500"
    }
} as const