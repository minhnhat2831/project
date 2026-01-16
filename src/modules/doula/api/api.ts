import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { DeleteDoulaResponse, DoulaBaseForm, DoulaDetailResponse, DoulaResponse, DoulaRequest, GetDoulaParams } from "../schema/DoulaSchema";
import type { GetTransactionParams, TransactionBaseForm } from "../schema/TransactionSchema";
import type { DoulaSubcriptionBaseForm } from "../schema/DoulaSubcriptionSchema";
import type { DoulaPackageBaseForm, DoulaPackageDetailResponse, DoulaPackageParams } from "../schema/DoulaPackageSchema";
import type { DoulaOverReviewResponse, DoulaReviewBaseForm, GetDoulaOverReviewParams, GetDoulaReviewParams } from "../schema/DoulaReviewSchema";

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

export const GetDoulaDetail = async (
    id?: string
): Promise<DoulaDetailResponse> => {
    const response = await axiosInstance.get<DoulaDetailResponse>(
        API_ENDPOINTS.API_DOULA_ID(id)
    )
    return response.data
}

export const EditDoula = async (
    id: string,
    data: DoulaRequest
): Promise<DoulaResponse> => {
    const respond = await axiosInstance.put<DoulaResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id),
        data
    )
    return respond.data
}

export const DeleteDoula = async (
    id?: string
): Promise<DeleteDoulaResponse> => {
    const respond = await axiosInstance.delete<DeleteDoulaResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id)
    )
    return respond.data
}

export const GetAllTransaction = async (
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

export const GetDoulaSubscriptionDetail = async (
    id?: string
): Promise<DoulaSubcriptionBaseForm> => {
    const response = await axiosInstance.get<DoulaSubcriptionBaseForm>(
        API_ENDPOINTS.API_DOULA_SUBSCRIPTIONS_ID(id)
    )
    return response.data
}

export const GetAllDoulaPackage = async (
    params: DoulaPackageParams
): Promise<DoulaPackageBaseForm> => {
    const response = await axiosInstance.get<DoulaPackageBaseForm>(
        API_ENDPOINTS.API_DOULA_PACKAGE,
        {
            params
        }
    )
    return response.data
}

export const GetDoulaPackageDetail = async (
    id?: string
): Promise<DoulaPackageDetailResponse> => {
    const response = await axiosInstance.get(
        API_ENDPOINTS.API_DOULA_PACKAGE_ID(id)
    )
    return response.data
}

export const GetAllDoulaReview = async (
    params: GetDoulaReviewParams
): Promise<DoulaReviewBaseForm> => {
    const response = await axiosInstance.get<DoulaReviewBaseForm>(
        API_ENDPOINTS.API_DOULA_REVIEW,
        {
            params
        }
    )
    return response.data
}

export const GetAllDoulaOverReview = async (
    params: GetDoulaOverReviewParams
): Promise<DoulaOverReviewResponse> => {
    const response = await axiosInstance.get<DoulaOverReviewResponse>(
        API_ENDPOINTS.API_DOULA_REVIEW_OVERVIEW,
        {
            params
        }
    )
    return response.data
}