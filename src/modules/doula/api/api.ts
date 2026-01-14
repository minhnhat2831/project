import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { DeleteDoulaResponse, DoulaBaseForm, DoulaDetailResponse, DoulaResponse, DoulaRequest, GetDoulaParams } from "../schema/DoulaSchema";
import type { GetTransactionParams, TransactionBaseForm } from "../schema/TransactionSchema";
import type { DoulaSubcriptionBaseForm } from "../schema/DoulaSubcriptionSchema";
import type { DoulaPackageBaseForm, DoulaPackageDetailResponse, DoulaPackageParams } from "../schema/DoulaPackageSchema";
import type { DoulaReviewBaseForm, GetDoulaReviewParams } from "../schema/DoulaReviewSchema";

export const GetAllDoula = async (
    params: GetDoulaParams
): Promise<DoulaBaseForm> => {
    const respond = await axiosInstance.get<DoulaBaseForm>(
        API_ENDPOINTS.API_ADMIN_DOULA,
        {
            params
        }
    )
    return respond.data;
}

export const GetById = async (
    id: string
): Promise<DoulaResponse> => {
    const respond = await axiosInstance.get<DoulaResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id)
    )
    return respond.data
}

export const UpdateDoula = async (
    id: string,
    data: DoulaRequest
): Promise<DoulaResponse> => {
    const respond = await axiosInstance.put<DoulaResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id),
        data 
    )
    return respond.data
}

export const DoulaRemove = async (
    id: string
): Promise<DeleteDoulaResponse> => {
    const respond = await axiosInstance.delete<DeleteDoulaResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id)
    )
    return respond.data
}

export const GetTransaction = async (
    params: GetTransactionParams
): Promise<TransactionBaseForm> => {
    const response = await axiosInstance.get<TransactionBaseForm>(
        API_ENDPOINTS.API_TRANSACTIONS,
        {
            params
        }
    )
    return response.data
}

export const GetDoulaSubscription = async (
    id: string
): Promise<DoulaSubcriptionBaseForm> => {
    const response = await axiosInstance.get<DoulaSubcriptionBaseForm>(
        API_ENDPOINTS.API_DOULA_SUBSCRIPTIONS_ID(id)
    )
    return response.data
}

export const GetDoulaInfo = async (
    id: string
): Promise<DoulaDetailResponse> => {
    const response = await axiosInstance.get<DoulaDetailResponse>(
        API_ENDPOINTS.API_DOULA_ID(id)
    )
    return response.data
}

export const GetDoulaPackage = async (
    params : DoulaPackageParams
):Promise<DoulaPackageBaseForm> => {
    const response = await axiosInstance.get<DoulaPackageBaseForm>(
        API_ENDPOINTS.API_DOULA_PACKAGE,
        {
            params
        }
    )
    return response.data
}

export const GetDoulaPackageId = async (
    id : string
):Promise<DoulaPackageDetailResponse> => {
    const response = await axiosInstance.get(
        API_ENDPOINTS.API_DOULA_PACKAGE_ID(id)
    )
    return response.data
}

export const GetDoulaReview = async (
    params : GetDoulaReviewParams
):Promise<DoulaReviewBaseForm> => {
    const response = await axiosInstance.get<DoulaReviewBaseForm>(
        API_ENDPOINTS.API_DOULA_REVIEW,
        {
            params
        }
    )
    return response.data
}