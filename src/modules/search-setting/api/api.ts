import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type {
    SearchSettingBaseForm,
    SearchSettingParams,
    SearchSettingRequest,
    SearchSettingResponse
} from "../schema/SearchSettingSchema";

export const GetAllSearchSetting = async (
    params: SearchSettingParams
): Promise<SearchSettingBaseForm> => {
    const response = await axiosInstance.get<SearchSettingBaseForm>(
        API_ENDPOINTS.API_SEARCH_SETTING,
        { params }
    )
    return response.data
}

export const CreateSearchSetting = async (
    data: SearchSettingRequest
): Promise<SearchSettingResponse> => {
    const response = await axiosInstance.post<SearchSettingResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING,
        data
    )
    return response.data
}

export const EditSearchSetting = async (
    id: string,
    data: SearchSettingRequest
): Promise<SearchSettingResponse> => {
    const response = await axiosInstance.put<SearchSettingResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING_ID(id),
        data
    )
    return response.data
}

export const DeleteSearchSetting = async (
    id?: string
): Promise<SearchSettingResponse> => {
    const response = await axiosInstance.delete<SearchSettingResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING_ID(id),
    )
    return response.data
}