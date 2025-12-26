export const buttonVariants = {
    base : 'w-full h-9 rounded border font-bold cursor-pointer',
    size : {
        sm : "",
        md : "",
        lg : ""
    },
    variant : {
        create : "bg-blue-500 hover:bg-blue-800",
        edit : "bg-blue-500 hover:bg-blue-800",
        delete : "bg-red-500 hover:bg-red-700 ",
        outline : "border-2",
        disable : "bg-gray-500 text-black cursor-not-allowed",
        cancel : "bg-white text-gray-500 hover:bg-gray-200"
    }
} as const