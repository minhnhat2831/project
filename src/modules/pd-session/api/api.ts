import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { GetCategoriesParams, GetCategoriesResponse } from "@/types/categories/Category";
import type { MediaUrlRequest, MediaUrlResponse } from "@/types/media/Media.type";
import type { GetPdParams, PdResponse } from "../types/Pd";
import type { PDIdResponse } from "../types/PdId";
import type { PdCreateRequest, PdCreateResponse } from "../types/PDCreate";
import type { PdEditRequest, PdEditResponse } from "../types/PdEdit";
import type { PdDelete, PdDeleteResponse } from "../types/PdDelete";

export const GetAll = async (
    params : GetPdParams
) : Promise<PdResponse> => {
    const response = await axiosInstance.get<PdResponse>(
        API_ENDPOINTS.API_ARTICLE,{
            params
        }
    )
    return response.data
}

export const GetById = async (
    id : string
) : Promise<PDIdResponse> => {
    const response = await axiosInstance.get<PDIdResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id)
    )
    return response.data
}

export const Createpd = async (
    data : PdCreateRequest
) : Promise<PdCreateResponse> => {
    const response = await axiosInstance.post<PdCreateResponse>(
        API_ENDPOINTS.API_ARTICLE,
        data
    )
    return response.data
}

export const EditPd = async (
    id : string,
    data : PdEditRequest
): Promise<PdEditResponse> => {
    const response = await axiosInstance.put<PdEditResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id),
        data
    )
    return response.data
}

export const DeletePd = async (
    data : PdDelete
) : Promise<PdDeleteResponse> => {
    const response = await axiosInstance.delete<PdDeleteResponse>(
        API_ENDPOINTS.API_ARTICLE,
        {data}
    )
    return response.data
}

export const GetCategory = async (
    params : GetCategoriesParams
): Promise<GetCategoriesResponse> => {
    const response = await axiosInstance.get<GetCategoriesResponse>(
        API_ENDPOINTS.API_CATEGOIES,
        {params}
    )
    return response.data
}

export const GetMedia = async (
    payload: MediaUrlRequest
) : Promise<MediaUrlResponse> => {
    const response = await axiosInstance.post<MediaUrlResponse>(
        API_ENDPOINTS.API_MEDIA,
        payload
    )
    return response.data
}
