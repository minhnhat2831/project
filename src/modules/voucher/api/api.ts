import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type { voucherDeleteRequest, voucherDoulaList, voucherDoulaParams, voucherList, voucherParams, voucherRequest, voucherResponse } from "../schema/VoucherSchema.type";

export const getAllVoucher = async (
    params: voucherParams
): Promise<voucherList> => {
    const response = await axiosInstance.get<voucherList>(
        API_ENDPOINTS.API_VOUCHERS,
        { params }
    )
    return response.data
}

export const createVoucher = async (
    data: voucherRequest
): Promise<voucherResponse> => {
    const response = await axiosInstance.post<voucherResponse>(
        API_ENDPOINTS.API_VOUCHERS,
        data
    )
    return response.data
}

export const getVoucherDetail = async (
    id?: string
): Promise<voucherResponse> => {
    const response = await axiosInstance.get<voucherResponse>(
        API_ENDPOINTS.API_VOUCHERS_ID(id)
    )
    return response.data
}

export const editVoucher = async (
    id: string,
    data: voucherDeleteRequest
): Promise<voucherResponse> => {
    const response = await axiosInstance.put<voucherResponse>(
        API_ENDPOINTS.API_VOUCHERS_ID(id),
        data
    )
    return response.data
}

export const getAllDoulaVoucher = async (
    params: voucherDoulaParams
): Promise<voucherDoulaList> => {
    const response = await axiosInstance.get<voucherDoulaList>(
        API_ENDPOINTS.API_DOULA_VOUCHER,
        { params }
    )
    return response.data
}