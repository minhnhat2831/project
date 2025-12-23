import axiosInstance from "@/services/axios"
import { API_ENDPOINTS } from "@/services/api"
import type { GetAdminsParams, GetAdminsResponse } from "../types/Admin"
import type { CreateAdminRequest, CreateAdminsResponse } from "../types/CreateAdmin"
import type { EditAdminResquest, EditAdminsResponse } from "../types/EditAdmin"
import type { DeleteAdminsResponse } from "../types/DeleteAdmin"

export const GetAdmins = async (
  params: GetAdminsParams
): Promise<GetAdminsResponse> => {
  const respond = await axiosInstance.get<GetAdminsResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS,
    { params }
  )

  return respond.data
}

export const CreateAdmin = async (
  data: CreateAdminRequest
): Promise<CreateAdminsResponse> => {
  const respond = await axiosInstance.post<CreateAdminsResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return respond.data
}

export const EditAdmin = async (
  data: EditAdminResquest,
  id: string
): Promise<EditAdminsResponse> => {
  const respond = await axiosInstance.put<EditAdminsResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id),
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  return respond.data
}

export const DeleteAdmin = async (
  id : string
): Promise<DeleteAdminsResponse> => {
  const respond = await axiosInstance.delete<DeleteAdminsResponse>(
    API_ENDPOINTS.API_ADMIN_ADMINS_ID(id)
  )
  return respond.data
}




