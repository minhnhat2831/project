import axiosInstance from "../../../services/axios";
import { API_ENDPOINTS } from "../../../services/api";
import type { loginRequest, loginResponse } from "../types/auth";

export const loginAdmin = async (
  payload: loginRequest
): Promise<loginResponse> => {
  const res = await axiosInstance.post(
    API_ENDPOINTS.API_ADMIN_LOGIN,
    payload
  );
  return res.data;
};
