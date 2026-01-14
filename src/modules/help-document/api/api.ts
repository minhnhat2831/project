import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { DeleteHelpDocumentResponse, HelpDocumentBaseForm, HelpDocumentParams, HelpDocumentRequest, HelpDocumentResponse } from "../schema/HelpDocumentSchema";

export const GetAllHelpDocument = async (
    params : HelpDocumentParams
):Promise<HelpDocumentBaseForm> => {
    const response = await axiosInstance.get<HelpDocumentBaseForm>(
        API_ENDPOINTS.API_HELP_DOCUMENT,
        {params}
    )
    return response.data
}

export const GetHelpDocumentById = async (
    id : string
):Promise<HelpDocumentResponse> => {
    const response = await axiosInstance.get<HelpDocumentResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT_ID(id)
    )
    return response.data
}

export const CreateHelpDocument = async (
    data : HelpDocumentRequest
):Promise<HelpDocumentResponse> => {
    const response = await axiosInstance.post<HelpDocumentResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT,
        data
    )
    return response.data
}

export const EditHelpDocument = async (
    id : string,
    data : HelpDocumentRequest
):Promise<HelpDocumentResponse> => {
    const response = await axiosInstance.put<HelpDocumentResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT_ID(id),
        data
    )
    return response.data
}

export const DeleteHelpDocument = async (
    id : string
):Promise<DeleteHelpDocumentResponse> => {
    const response = await axiosInstance.delete<DeleteHelpDocumentResponse>(
        API_ENDPOINTS.API_HELP_DOCUMENT_ID(id)
    )
    return response.data
}