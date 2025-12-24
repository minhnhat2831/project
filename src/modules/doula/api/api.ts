import type { GetDoulaParams, GetDoulaResponse } from "../types/admin-doula/AdminDoula";
import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { GetDoulaId, GetDoulaIdResponse } from "../types/admin-doula/AdminDoulaId";
import type { GetDoulaEditRequest, GetDoulaEditResponse } from "../types/admin-doula/AdminDoulaEdit";
import type { DeleteAdminsResponse } from "../../admin/types/DeleteAdmin";
import type { GetTransactions, TransactionParams } from "../types/transactions/Transactions";
import type { GetDoulaSubscriptionsId } from "../types/doula_subscription/DoulaSubscription";
import type { DoulaPackageParams, DoulaPackageResponse } from "../types/doula-package/DoulaPackage";
import type { DoulaReviewParams, DoulaReviewResponse } from "../types/doula-review/DoulaReview";

export const GetAllDoula = async (
    params: GetDoulaParams
): Promise<GetDoulaResponse> => {
    const respond = await axiosInstance.get<GetDoulaResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA,
        {
            params
        }
    )
    return respond.data;
}

export const GetById = async (
    id: string
): Promise<GetDoulaId> => {
    const respond = await axiosInstance.get<GetDoulaId>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id)
    )
    return respond.data
}

export const UpdateDoula = async (
    id: string,
    data: GetDoulaEditRequest
): Promise<GetDoulaEditResponse> => {
    const respond = await axiosInstance.put<GetDoulaEditResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id),
        data 
    )
    return respond.data
}

export const DoulaDelete = async (
    id: string
): Promise<DeleteAdminsResponse> => {
    const respond = await axiosInstance.delete<DeleteAdminsResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id)
    )
    return respond.data
}

export const GetTransaction = async (
    params: TransactionParams
): Promise<GetTransactions> => {
    const response = await axiosInstance.get<GetTransactions>(
        API_ENDPOINTS.API_TRANSACTIONS,
        {
            params
        }
    )
    return response.data
}

export const GetDoulaSubscription = async (
    id: string
): Promise<GetDoulaSubscriptionsId> => {
    const response = await axiosInstance.get<GetDoulaSubscriptionsId>(
        API_ENDPOINTS.API_DOULA_SUBSCRIPTIONS_ID(id)
    )
    return response.data
}

export const GetDoulaInfo = async (
    id: string
): Promise<GetDoulaIdResponse> => {
    const response = await axiosInstance.get<GetDoulaIdResponse>(
        API_ENDPOINTS.API_DOULA_ID(id)
    )
    return response.data
}

export const GetDoulaPackage = async (
    params : DoulaPackageParams
):Promise<DoulaPackageResponse> => {
    const response = await axiosInstance.get<DoulaPackageResponse>(
        API_ENDPOINTS.API_DOULA_PACKAGE,
        {
            params
        }
    )
    return response.data
}

export const GetDoulaReview = async (
    params : DoulaReviewParams
):Promise<DoulaReviewResponse> => {
    const response = await axiosInstance.get<DoulaReviewResponse>(
        API_ENDPOINTS.API_DOULA_REVIEW,
        {
            params
        }
    )
    return response.data
}