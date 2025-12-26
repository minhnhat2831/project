import { useForm } from "react-hook-form"
import InputField from "@/components/common/form/Input"
import type { loginRequest } from "../types/auth";
import { LoginAdmin } from "../api/api";
import { useNavigate } from "react-router";
import { API } from "@/services/api";
import { toast, ToastContainer } from "react-toastify";
import Button from "@/components/common/form/Button";

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
            const res = await LoginAdmin(data);
            const { accessToken, refreshToken } = res.data.tokens;
            localStorage.setItem("admin", JSON.stringify(res.data.admin));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            navigate(`${API.BASE_URL}/admin`);
        } catch (error: any) {
            toast.error(error.response?.data?.message);
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
                            inputSize="lg"
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
                            inputSize="lg"
                            placeholder="Password"
                            label="Password"
                            {...register('password', {
                                required: "Password is required"
                            })}
                            error={errors.password?.message}
                        />
                    </div>
                    <div className="px-4">
                        <Button
                            type="submit"
                            className="mt-5"
                        >Login</Button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}