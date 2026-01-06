import axiosInstance from "@/services/axios";
import type { SearchSettingParams, SearchSettingResponse } from "../types/SearchSetting";
import { API_ENDPOINTS } from "@/services/api";
import type { SearchSettingCreateRequest, SearchSettingCreateResponse } from "../types/SearchSettingCreate";
import type { SearchSettingEditRequest, SearchSettingEditResponse } from "../types/SearchSettingEdit";
import type { SearchSettingDeleteResponse } from "../types/SearchSettingDelete";

export const GetAllSetting = async (
    params : SearchSettingParams
): Promise<SearchSettingResponse> => {
    const response = await axiosInstance.get<SearchSettingResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING,
        {params}
    )
    return response.data
}

export const CreateSetting = async (
    data : SearchSettingCreateRequest
):Promise<SearchSettingCreateResponse> => {
    const response = await axiosInstance.post<SearchSettingCreateResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING,
        data
    )
    return response.data
}

export const EditSetting = async (
    id : string,
    data : SearchSettingEditRequest
):Promise<SearchSettingEditResponse> => {
    const response = await axiosInstance.put<SearchSettingEditResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING_ID(id),
        data
    )
    return response.data
}

export const DeleteSetting = async (
    id : string
):Promise<SearchSettingDeleteResponse> => {
    const response = await axiosInstance.delete<SearchSettingDeleteResponse>(
        API_ENDPOINTS.API_SEARCH_SETTING_ID(id),
    )
    return response.data
}