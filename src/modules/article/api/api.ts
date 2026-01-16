import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type {
    ArticleBaseForm,
    ArticleDelete,
    ArticleDeleteResponse,
    ArticleRequest,
    ArticleResponse,
    GetArticleParams
} from "../schema/ArticleScheme";
import type { MediaUrlRequest, MediaUrlResponse } from "@/types/media/Media.type";
import type { CategoryBaseForm, GetCategoryParams } from "@/modules/category/schema/CategorySchema";

export const GetAllArticle = async (
    params: GetArticleParams
): Promise<ArticleBaseForm> => {
    const response = await axiosInstance.get<ArticleBaseForm>(
        API_ENDPOINTS.API_ARTICLE, {
        params
    }
    )
    return response.data
}

export const GetArticleDetail = async (
    id?: string
): Promise<ArticleResponse> => {
    const response = await axiosInstance.get<ArticleResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id)
    )
    return response.data
}

export const CreateArticle = async (
    data: ArticleRequest
): Promise<ArticleResponse> => {
    const response = await axiosInstance.post<ArticleResponse>(
        API_ENDPOINTS.API_ARTICLE,
        data
    )
    return response.data
}

export const EditArticle = async (
    data: ArticleRequest,
    id: string
): Promise<ArticleResponse> => {
    const response = await axiosInstance.put<ArticleResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id),
        data
    )
    return response.data
}

export const DeleteArticle = async (
    data: ArticleDelete
): Promise<ArticleDeleteResponse> => {
    const response = await axiosInstance.delete<ArticleDeleteResponse>(
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
