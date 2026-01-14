import { API_ENDPOINTS } from "@/services/api";
import axiosInstance from "@/services/axios";
import type { 
    ClientBaseForm, 
    ClientDeleteResponse, 
    ClientRequest, 
    ClientResponse, 
    GetClientParams 
} from "../schema/ClientSchema";
import type { CaresBaseForm, GetCaresParams } from "../schema/CaresSchema";


export const GetAllClient = async (
    params : GetClientParams
) : Promise<ClientBaseForm> => {
    const response = await axiosInstance.get<ClientBaseForm>(
        API_ENDPOINTS.API_ADMIN_CLIENT,
        {params}
    )
    return response.data
}

export const GetClientId = async (
    id : string
) : Promise<ClientResponse> => {
    const response = await axiosInstance.get<ClientResponse>(
        API_ENDPOINTS.API_ADMIN_CLIENT_ID(id)
    )
    return response.data
}

export const EditClient = async (
    id : string,
    data : ClientRequest
) : Promise<ClientResponse> => {
    const response = await axiosInstance.put<ClientResponse>(
        API_ENDPOINTS.API_ADMIN_CLIENT_ID(id),
            data
    )
    return response.data
}

export const DeleteClient = async (
    id : string
):Promise<ClientDeleteResponse> => {
    const response = await axiosInstance.delete<ClientDeleteResponse>(
        API_ENDPOINTS.API_ADMIN_CLIENT_ID(id)
    )
    return response.data
}

export const GetCares = async (
    params : GetCaresParams
) : Promise<CaresBaseForm> => {
    const response = await axiosInstance.get<CaresBaseForm>(
        API_ENDPOINTS.API_CARES,
        {params}
    )
    return response.data
}