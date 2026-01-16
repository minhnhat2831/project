import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type {
    CategoryBaseForm,
    CategoryDelete,
    CategoryDeleteResponse,
    CategoryRequest,
    CategoryResponse,
    GetCategoryParams
} from "../schema/CategorySchema";

export const GetAllCategory = async (
    params: GetCategoryParams
): Promise<CategoryBaseForm> => {
    const response = await axiosInstance.get<CategoryBaseForm>(
        API_ENDPOINTS.API_CATEGOIES,
        {
            params
        }
    )
    return response.data
}

export const GetCategoryDetail = async (
    id?: string
): Promise<CategoryResponse> => {
    const response = await axiosInstance.get<CategoryResponse>(
        API_ENDPOINTS.API_CATEGOIES_ID(id)
    )
    return response.data
}

export const CreateCategory = async (
    data: CategoryRequest
): Promise<CategoryResponse> => {
    const response = await axiosInstance.post<CategoryResponse>(
        API_ENDPOINTS.API_CATEGOIES,
        data
    )
    return response.data
}

export const EditCategory = async (
    id: string,
    data: CategoryRequest
): Promise<CategoryResponse> => {
    const response = await axiosInstance.put<CategoryResponse>(
        API_ENDPOINTS.API_CATEGOIES_ID(id),
        data
    )
    return response.data
}

export const DeleteCategory = async (
    data: CategoryDelete
): Promise<CategoryDeleteResponse> => {
    const response = await axiosInstance.delete<CategoryDeleteResponse>(
        API_ENDPOINTS.API_CATEGOIES,
        { data }
    )
    return response.data
}