import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { MediaUrlRequest, MediaUrlResponse } from "@/types/media/Media.type";
import type { GetPdParams, PdBaseForm, PdDelete, PdDeleteResponse, PdRequest, PdResponse } from "../schema/PdSchema";
import type { CategoryBaseForm, GetCategoryParams } from "@/modules/category/schema/CategorySchema";

export const GetAllPdSession = async (
    params: GetPdParams
): Promise<PdBaseForm> => {
    const response = await axiosInstance.get<PdBaseForm>(
        API_ENDPOINTS.API_ARTICLE, {
        params
    }
    )
    return response.data
}

export const GetPdSessionDetail = async (
    id?: string
): Promise<PdResponse> => {
    const response = await axiosInstance.get<PdResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id)
    )
    return response.data
}

export const CreatePdSession = async (
    data: PdRequest
): Promise<PdResponse> => {
    const response = await axiosInstance.post<PdResponse>(
        API_ENDPOINTS.API_ARTICLE,
        data
    )
    return response.data
}

export const EditPdSession = async (
    id: string,
    data: PdRequest
): Promise<PdResponse> => {
    const response = await axiosInstance.put<PdResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id),
        data
    )
    return response.data
}

export const DeletePdSession = async (
    data: PdDelete
): Promise<PdDeleteResponse> => {
    const response = await axiosInstance.delete<PdDeleteResponse>(
        API_ENDPOINTS.API_ARTICLE,
        { data }
    )
    return response.data
}

export const GetAllCategory = async (
    params: GetCategoryParams
): Promise<CategoryBaseForm> => {
    const response = await axiosInstance.get<CategoryBaseForm>(
        API_ENDPOINTS.API_CATEGOIES,
        { params }
    )
    return response.data
}

export const GetMedia = async (
    payload: MediaUrlRequest
): Promise<MediaUrlResponse> => {
    const response = await axiosInstance.post<MediaUrlResponse>(
        API_ENDPOINTS.API_MEDIA,
        payload
    )
    return response.data
}
