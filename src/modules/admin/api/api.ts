import axiosInstance from "@/services/axios"
import { API_ENDPOINTS } from "@/services/api"
import type { 

} from "../schema/AdminUserSchema"
import type { 
  adminDetailResponse, 
  adminFormCreate, 
  adminFormEdit, 
  adminList, 
  adminUserResponse, 
  adminsParams 
} from "../schema/AdminUserSchema.type"

export const getAllAdmin = async (
  params: adminsParams
): Promise<adminList> => {
  const response = await axiosInstance.get<adminList>(
    API_ENDPOINTS.API_ADMIN_ADMINS,
    { params }
  )
  return response.data
}

export const createAdmin = async (
  data: adminFormCreate
): Promise<adminList> => {
  const response = await axiosInstance.post<adminList>(
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

export const editAdmin = async (
  data: adminFormEdit,
  id: string
): Promise<adminList> => {
  const response = await axiosInstance.put<adminList>(
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

export const deleteAdmin = async (
  id? : string
): Promise<adminUserResponse> => {
  const response = await axiosInstance.delete<adminUserResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id)
  )
  return response.data
}

export const getAdminDetail = async (
  id? : string
) : Promise<adminDetailResponse> => {
  const response = await axiosInstance.get<adminDetailResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id)
  )
  return response.data
}