import axiosInstance from "@/services/axios"
import { API_ENDPOINTS } from "@/services/api"
import type { GetAdminsParams, GetAdminsResponse } from "../types/Admin"
import type { CreateAdminRequest, CreateAdminsResponse } from "../types/CreateAdmin"
import type { EditAdminResquest, EditAdminsResponse } from "../types/EditAdmin"
import type { DeleteAdminsResponse } from "../types/DeleteAdmin"
import type { AdminIdResponse } from "../types/AdminId"

export const GetAdmins = async (
  params: GetAdminsParams
): Promise<GetAdminsResponse> => {
  const response = await axiosInstance.get<GetAdminsResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS,
    { params }
  )
  return response.data
}

export const CreateAdmin = async (
  data: CreateAdminRequest
): Promise<CreateAdminsResponse> => {
  const response = await axiosInstance.post<CreateAdminsResponse>(
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
  data: EditAdminResquest,
  id: string
): Promise<EditAdminsResponse> => {
  const response = await axiosInstance.put<EditAdminsResponse>(
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
  id : string
): Promise<DeleteAdminsResponse> => {
  const response = await axiosInstance.delete<DeleteAdminsResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id)
  )
  return response.data
}

export const GetAdminId = async (
  id : string
) : Promise<AdminIdResponse> => {
  const response = await axiosInstance.get<AdminIdResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id)
  )
  return response.data
}


