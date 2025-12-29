import { API_ENDPOINTS } from "@/services/api";
import axiosInstance from "@/services/axios";
import type { GetClientResponse, GetClientParams } from "../types/client/Client";
import type { ClientDelete } from "../types/client/ClientDelete";
import type { ClientEditRequest, ClientEditResponse } from "../types/client/ClientEdit";
import type { GetClientIdResponse } from "../types/client/ClientId";
import type { GetAllCaresResponse, GetCaresParams } from "../types/cares/cares";

export const GetAllClient = async (
    params : GetClientParams
) : Promise<GetClientResponse> => {
    const response = await axiosInstance.get<GetClientResponse>(
        API_ENDPOINTS.API_ADMIN_CLIENT,
        {params}
    )
    return response.data
}

export const GetClientId = async (
    id : string
) : Promise<GetClientIdResponse> => {
    const response = await axiosInstance.get<GetClientIdResponse>(
        API_ENDPOINTS.API_ADMIN_CLIENT_ID(id)
    )
    return response.data
}

export const EditClient = async (
    id : string,
    data : ClientEditRequest
) : Promise<ClientEditResponse> => {
    const response = await axiosInstance.put<ClientEditResponse>(
        API_ENDPOINTS.API_ADMIN_CLIENT_ID(id),
            data
    )
    return response.data
}

export const DeleteClient = async (
    id : string
):Promise<ClientDelete> => {
    const response = await axiosInstance.delete<ClientDelete>(
        API_ENDPOINTS.API_ADMIN_CLIENT_ID(id)
    )
    return response.data
}

export const GetCares = async (
    params : GetCaresParams
) : Promise<GetAllCaresResponse> => {
    const response = await axiosInstance.get<GetAllCaresResponse>(
        API_ENDPOINTS.API_CARES,
        {params}
    )
    return response.data
}