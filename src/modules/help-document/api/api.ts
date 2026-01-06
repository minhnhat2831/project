import axiosInstance from "@/services/axios";
import type { HelpDocumentParams, HelpDocumentResponse } from "../types/HelpDocument";
import { API_ENDPOINTS } from "@/services/api";
import type { HelpDocumentIdResponse } from "../types/HelpDocumentById";
import type { HelpDocumentCreateRequest, HelpDocumentCreateResponse } from "../types/HelpDocumentCreate";
import type { HelpDocumentEditRequest, HelpDocumentEditResponse } from "../types/HelpDocumentEdit";
import type { HelpDocumentDeleteResponse } from "../types/HelpDocumentDelete";

export const GetAllHelpDocument = async (
    params : HelpDocumentParams
):Promise<HelpDocumentResponse> => {
    const response = await axiosInstance.get<HelpDocumentResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT,
        {params}
    )
    return response.data
}

export const GetHelpDocumentById = async (
    id : string
):Promise<HelpDocumentIdResponse> => {
    const response = await axiosInstance.get<HelpDocumentIdResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT_ID(id)
    )
    return response.data
}

export const CreateHelpDocument = async (
    data : HelpDocumentCreateRequest
):Promise<HelpDocumentCreateResponse> => {
    const response = await axiosInstance.post<HelpDocumentCreateResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT,
        data
    )
    return response.data
}

export const EditHelpDocument = async (
    id : string,
    data : HelpDocumentEditRequest
):Promise<HelpDocumentEditResponse> => {
    const response = await axiosInstance.put<HelpDocumentEditResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT_ID(id),
        data
    )
    return response.data
}

export const DeleteHelpDocument = async (
    id : string
):Promise<HelpDocumentDeleteResponse> => {
    const response = await axiosInstance.delete<HelpDocumentDeleteResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT_ID(id)
    )
    return response.data
}