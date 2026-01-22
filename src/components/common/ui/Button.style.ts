export const buttonVariants = {
    base: 'h-9 rounded font-bold cursor-pointer',
    size: {
        sm: "w-20",
        md: "w-full",
        lg: "w-fit"
    },
    variant: {
        create: "bg-blue-500 hover:bg-blue-800",
        edit: "bg-blue-500 hover:bg-blue-800",
        delete: "bg-red-500 hover:bg-red-700 ",
        outline: "border-2",
        disable: "bg-gray-500 text-black cursor-not-allowed",
        cancel: "bg-white text-gray-500 hover:bg-gray-200",
        close: "mr-2 hover:bg-gray-200 w-6 h-8",
        normal : ""
    }
} as const