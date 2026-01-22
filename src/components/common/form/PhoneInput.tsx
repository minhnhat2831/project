interface props {
    label?: string,
    error?: string;
    className?: string
}

export default function PhoneInput({ label, error, className, ...rest }: props) {
    return (<>
        <div className="mr-4 -ml-4 mb-4">
            {label && <label className="block mb-2">{label}<span className="text-red-500">*</span></label>}
            <input className={`border h-10 pl-2 pr-2 rounded shadow-md w-full ${className}`}
                type="number"
                {...rest}
            >
            </input>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    </>)
}