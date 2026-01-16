import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { LoginRequest, LoginResponse } from "../schema/UserSchema";

export const GetLogin = async (
  payload: LoginRequest
): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>(
    API_ENDPOINTS.API_ADMIN_LOGIN,
    payload
  );
  return res.data;
};
