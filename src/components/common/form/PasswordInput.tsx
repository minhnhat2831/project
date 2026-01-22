import { Icons } from "../base/Icon"
import { usePasswordStore } from "@/hooks/usePasswordToggle";

interface props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    children?: string,
    error?: string,
    type?: string,
    showPassword?: boolean,
    placeholder?: string,
}

export default function PasswordInput({ label, placeholder, children, showPassword, error, type, ...rest }: props) {
    const { openPassword, setOpenPassword } = usePasswordStore();
    return (<>
        <div className="px-4">
            {label && <label className="block mb-1">{label}<span className="text-red-500"> *</span></label>}
            <input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className={`h-10 pl-4 pr-15 rounded shadow-md text-md w-full border
                ${error
                        ? 'border-red-300 focus:border-red-500'
                        : 'border focus:border-green-500 hover:outline hover:outline-green-300'
                    }`}
                {...rest}
            />
            <button
                type="button"
                className={`absolute cursor-pointer p-1 -ml-11`}
                onClick={() => setOpenPassword(!openPassword)}
            >
                {showPassword ? <Icons.Eye /> : <Icons.EyeOff />}
            </button>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    </>)
}