import axiosInstance from "@/services/axios";
import type { ArticleResponse, GetArticleParams } from "../types/article/Article";
import { API_ENDPOINTS } from "@/services/api";
import type { ArticleIdResponse } from "../types/article/ArticleById";
import type { ArticleCreateRequest, ArticleCreateResponse } from "../types/article/ArticleCreate";
import type { ArticleEditRequest, ArticleEditResponse } from "../types/article/ArticleEdit";
import type { ArticleDelete, ArticleDeleteResponse } from "../types/article/ArticleDelete";
import type { GetCategoriesParams, GetCategoriesResponse } from "@/types/categories/Category";
import type { MediaUrlRequest, MediaUrlResponse } from "@/types/media/Media.type";

export const GetAll = async (
    params : GetArticleParams
) : Promise<ArticleResponse> => {
    const response = await axiosInstance.get<ArticleResponse>(
        API_ENDPOINTS.API_ARTICLE,{
            params
        }
    )
    return response.data
}

export const GetById = async (
    id : string
) :  Promise<ArticleIdResponse> => {
    const response = await axiosInstance.get<ArticleIdResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id)
    )
    return response.data
}

export const CreateArticle = async (
    data : ArticleCreateRequest
) : Promise<ArticleCreateResponse> => {
    const response = await axiosInstance.post<ArticleCreateResponse>(
        API_ENDPOINTS.API_ARTICLE,
        data
    )
    return response.data
}

export const EditArticle = async (
    id : string,
    data : ArticleEditRequest
): Promise<ArticleEditResponse> => {
    const response = await axiosInstance.put<ArticleEditResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id),
        data
    )
    return response.data
}

export const DeleteArticle = async (
    data : ArticleDelete
) : Promise<ArticleDeleteResponse> => {
    const response = await axiosInstance.delete<ArticleDeleteResponse>(
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
