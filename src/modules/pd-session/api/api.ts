import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { MediaUrlRequest, MediaUrlResponse } from "@/types/media/Media.type";
import type { pdDelete, pdDeleteResponse, pdList, pdParams, pdRequest, pdResponse } from "../schema/PdSchema.type";
import type { categoryList, categoryParams } from "@/modules/category/schema/CategorySchema.type";

export const getAllPdSession = async (
    params: pdParams
): Promise<pdList> => {
    const response = await axiosInstance.get<pdList>(
        API_ENDPOINTS.API_ARTICLE, {
        params
    }
    )
    return response.data
}

export const getPdSessionDetail = async (
    id?: string
): Promise<pdResponse> => {
    const response = await axiosInstance.get<pdResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id)
    )
    return response.data
}

export const createPdSession = async (
    data: pdRequest
): Promise<pdResponse> => {
    const response = await axiosInstance.post<pdResponse>(
        API_ENDPOINTS.API_ARTICLE,
        data
    )
    return response.data
}

export const editPdSession = async (
    id: string,
    data: pdRequest
): Promise<pdResponse> => {
    const response = await axiosInstance.put<pdResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id),
        data
    )
    return response.data
}

export const deletePdSession = async (
    data: pdDelete
): Promise<pdDeleteResponse> => {
    const response = await axiosInstance.delete<pdDeleteResponse>(
        API_ENDPOINTS.API_ARTICLE,
        { data }
    )
    return response.data
}

export const getAllCategory = async (
    params: categoryParams
): Promise<categoryList> => {
    const response = await axiosInstance.get<categoryList>(
        API_ENDPOINTS.API_CATEGOIES,
        { params }
    )
    return response.data
}

export const getMedia = async (
    payload: MediaUrlRequest
): Promise<MediaUrlResponse> => {
    const response = await axiosInstance.post<MediaUrlResponse>(
        API_ENDPOINTS.API_MEDIA,
        payload
    )
    return response.data
}
