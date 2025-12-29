export const inputVariants = {
    base : 'border h-10 pl-2 pr-2 rounded shadow-md',
    size : {
        sm : "w-12",
        md : "w-100",
        lg : "w-full"
    },
    variant : {
        form : "",
        search : "focus:outline focus:outline-sky-500",
        disable : "bg-gray-200"
    }
} as const