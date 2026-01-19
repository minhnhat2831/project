import { useForm } from "react-hook-form"
import InputField from "@/components/common/form/Input"
import { getLogin } from "../api/api";
import { useNavigate } from "react-router";
import { API } from "@/services/api";
import { toast, ToastContainer } from "react-toastify";
import Button from "@/components/common/form/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInput from "@/components/common/form/PasswordInput";
import { usePasswordStore } from "@/hooks/usePasswordToggle";
import { loginRequestSchema } from "../schema/LoginSchema";
import type { loginRequest } from "../schema/LoginSchema.type";


export default function LoginPage() {
    const navigate = useNavigate();
    const { openPassword } = usePasswordStore()
    const { register, handleSubmit, formState: { errors } } = useForm<loginRequest>({
        resolver: zodResolver(loginRequestSchema)
    })

    const onSubmit = async (data: loginRequest) => {
        try {
            const res = await getLogin(data);

            const { accessToken, refreshToken } = res.data.tokens;

            //Lưu thông tin user
            localStorage.setItem("admin", JSON.stringify(res.data.admin));

            //Lưu accessToken và refreshToken
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            //Lấy thông tin user
            const adminData = localStorage.getItem("admin")
            const admin = adminData ? JSON.parse(adminData) : null

            //Chuyển hướng nếu khác role superAdmin
            if (admin.role == "superAdmin") {
                navigate(`${API.BASE_URL}/admin`);
            } else {
                navigate(`${API.BASE_URL}/admin/doulas`);
            }

        } catch (error: any) {
            toast.error(error.response?.data?.message);
        }
    };

    return (<>
        <ToastContainer />
        <div className="h-screen justify-center flex items-center bg-[url(/bg.jpg)] bg-cover">
            <div className="w-90 h-100 rounded-3xl bg-white px-8 py-15">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center w-full h-10">
                        <p className="font-bold text-2xl">CMS Login</p>
                    </div>
                    <div>
                        <InputField
                            type="text"
                            inputSize="lg"
                            placeholder="Username or email"
                            className="mb-2"
                            label="UserName or Email"
                            {...register("username")}
                            error={errors.username?.message}
                        />
                    </div>
                    <div>
                        <PasswordInput
                            label="Password"
                            type="password"
                            showPassword={openPassword}
                            placeholder="Password"
                            {...register("password")}
                            error={errors.password?.message}>
                        </PasswordInput>
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