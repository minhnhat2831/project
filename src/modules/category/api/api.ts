import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { 
    categoryDelete, 
    categoryDeleteResponse, 
    categoryList, 
    categoryRequest, 
    categoryResponse, 
    categoryParams 
} from "../schema/CategorySchema.type";

export const getAllCategory = async (
    params: categoryParams
): Promise<categoryList> => {
    const response = await axiosInstance.get<categoryList>(
        API_ENDPOINTS.API_CATEGOIES,
        {
            params
        }
    )
    return response.data
}

export const getCategoryDetail = async (
    id?: string
): Promise<categoryResponse> => {
    const response = await axiosInstance.get<categoryResponse>(
        API_ENDPOINTS.API_CATEGOIES_ID(id)
    )
    return response.data
}

export const createCategory = async (
    data: categoryRequest
): Promise<categoryResponse> => {
    const response = await axiosInstance.post<categoryResponse>(
        API_ENDPOINTS.API_CATEGOIES,
        data
    )
    return response.data
}

export const editCategory = async (
    id: string,
    data: categoryRequest
): Promise<categoryResponse> => {
    const response = await axiosInstance.put<categoryResponse>(
        API_ENDPOINTS.API_CATEGOIES_ID(id),
        data
    )
    return response.data
}

export const deleteCategory = async (
    data: categoryDelete
): Promise<categoryDeleteResponse> => {
    const response = await axiosInstance.delete<categoryDeleteResponse>(
        API_ENDPOINTS.API_CATEGOIES,
        { data }
    )
    return response.data
}