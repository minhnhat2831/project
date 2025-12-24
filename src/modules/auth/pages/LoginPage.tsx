import { useForm } from "react-hook-form"
import InputField from "@/components/common/form/Input"
import type { loginRequest } from "../types/auth";
import { LoginAdmin } from "../api/api";
import { useNavigate } from "react-router";
import { API } from "@/services/api";
import { toast, ToastContainer } from "react-toastify";

export default function LoginPage() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<loginRequest>({
        defaultValues: {
            username: "",
            password: ""
        },
    })

    const onSubmit = async (data: loginRequest) => {
        try {
            console.log(data)
            const res = await LoginAdmin(data);
            const { accessToken, refreshToken } = res.data.tokens;
            localStorage.setItem("admin", JSON.stringify(res.data.admin));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            navigate(`${API.BASE_URL}/admin`);
        } catch (error: any) {
            (error.response?.data?.message);
            toast("Đăng nhập thất bại")
        }
    };

    return (<>
    <ToastContainer />
        <div className="h-screen justify-center flex items-center bg-[url(/bg.jpg)] bg-cover">
            <div className="w-90 h-90 rounded-3xl bg-white px-8 py-16">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center w-full h-10">
                        <p className="font-bold text-2xl">CMS Login</p>
                    </div>
                    <div>
                        <InputField
                            type="text"
                            placeholder="Username or email"
                            label="UserName or Email"
                            {...register("username", {
                                required: "Username is required",
                            })}
                            error={errors.username?.message}
                        />
                    </div>
                    <div>
                        <InputField
                            type="password"
                            placeholder="Password"
                            label="Password"
                            {...register('password', {
                                required: "Password is required"
                            })}
                            error={errors.password?.message}
                        />
                    </div>
                    <div className="px-4">
                        <button className="bg-indigo-400 w-full h-10 mt-2 rounded cursor-pointer">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}