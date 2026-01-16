import axiosInstance from "@/services/axios"
import { API_ENDPOINTS } from "@/services/api"
import type {
  AdminDetailResponse,
  AdminFormCreate,
  AdminFormEdit,
  AdminUserBaseForm,
  AdminUserResponse,
  GetAdminsParams
} from "../schema/AdminUserSchema"

export const GetAllAdmin = async (
  params: GetAdminsParams
): Promise<AdminUserBaseForm> => {
  const response = await axiosInstance.get<AdminUserBaseForm>(
    API_ENDPOINTS.API_ADMIN_ADMINS,
    { params }
  )
  return response.data
}

export const CreateAdmin = async (
  data: AdminFormCreate
): Promise<AdminUserBaseForm> => {
  const response = await axiosInstance.post<AdminUserBaseForm>(
    API_ENDPOINTS.API_ADMIN_ADMINS,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response.data
}

export const EditAdmin = async (
  data: AdminFormEdit,
  id: string
): Promise<AdminUserBaseForm> => {
  const response = await axiosInstance.put<AdminUserBaseForm>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id),
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return response.data
}

export const DeleteAdmin = async (
  id?: string
): Promise<AdminUserResponse> => {
  const response = await axiosInstance.delete<AdminUserResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id)
  )
  return response.data
}

export const GetAdminDetail = async (
  id?: string
): Promise<AdminDetailResponse> => {
  const response = await axiosInstance.get<AdminDetailResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id)
  )
  return response.data
}