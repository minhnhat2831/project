import axiosInstance from "@/services/axios";
import type { GetCategoryList, GetCategoryParams } from "../types/Category";
import { API_ENDPOINTS } from "@/services/api";
import type { GetCategoryById } from "../types/CategoryId";
import type { CreateCategoryRequest } from "../types/CategoryCreate";
import type { CreateAdminsResponse } from "@/modules/admin/types/CreateAdmin";
import type { EditCategoryRequest, EditCategoryResponse } from "../types/CategoryEdit";
import type { DeleteCategoryRequest, DeleteCategoryResponse } from "../types/CategoryDelete";

export const GetAllCategory = async (
    params : GetCategoryParams
): Promise<GetCategoryList> => {
    const response = await axiosInstance.get<GetCategoryList>(
        API_ENDPOINTS.API_CATEGOIES,
        {
            params
        }
    )
    return response.data
}

export const GetCategoryId = async (
    id : string
):Promise<GetCategoryById> => {
    const response = await axiosInstance.get<GetCategoryById>(
        API_ENDPOINTS.API_CATEGOIES_ID(id)
    )
    return response.data
}

export const CreateCategory = async (
    data : CreateCategoryRequest
):Promise<CreateAdminsResponse> => {
    const response = await axiosInstance.post<CreateAdminsResponse>(
        API_ENDPOINTS.API_CATEGOIES,
        data
    )
    return response.data
}

export const EditCategory = async (
    id : string,
    data : EditCategoryRequest
):Promise<EditCategoryResponse> => {
    const response = await axiosInstance.put<EditCategoryResponse>(
        API_ENDPOINTS.API_CATEGOIES_ID(id),
        data
    )
    return response.data
}

export const DeleteCategory = async (
    data : DeleteCategoryRequest
):Promise<DeleteCategoryResponse> => {
    const response = await axiosInstance.delete<DeleteCategoryResponse>(
        API_ENDPOINTS.API_CATEGOIES,
        {data}
    )
    return response.data
}