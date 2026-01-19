import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { MediaUrlRequest, MediaUrlResponse } from "@/types/media/Media.type";
import type { categoryParams } from "@/modules/category/schema/CategorySchema.type";
import type { 
    articleDelete, 
    articleDeleteResponse, 
    articleList, 
    articleRequest, 
    articleResponse, 
    articleParams 
} from "../schema/ArticleScheme.type";
import type { categoryList } from "@/modules/category/schema/CategorySchema.type";

export const getAllArticle = async (
    params: articleParams
): Promise<articleList> => {
    const response = await axiosInstance.get<articleList>(
        API_ENDPOINTS.API_ARTICLE, {
        params
    }
    )
    return response.data
}

export const getArticleDetail = async (
    id?: string
): Promise<articleResponse> => {
    const response = await axiosInstance.get<articleResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id)
    )
    return response.data
}

export const createArticle = async (
    data: articleRequest
): Promise<articleResponse> => {
    const response = await axiosInstance.post<articleResponse>(
        API_ENDPOINTS.API_ARTICLE,
        data
    )
    return response.data
}

export const editArticle = async (
    data: articleRequest,
    id: string
): Promise<articleResponse> => {
    const response = await axiosInstance.put<articleResponse>(
        API_ENDPOINTS.API_ARTICLE_ID(id),
        data
    )
    return response.data
}

export const deleteArticle = async (
    data: articleDelete
): Promise<articleDeleteResponse> => {
    const response = await axiosInstance.delete<articleDeleteResponse>(
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

export const GetMedia = async (
    payload: MediaUrlRequest
): Promise<MediaUrlResponse> => {
    const response = await axiosInstance.post<MediaUrlResponse>(
        API_ENDPOINTS.API_MEDIA,
        payload
    )
    return response.data
}
