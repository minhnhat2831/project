import axiosInstance from "@/services/axios";
import { API_ENDPOINTS } from "@/services/api";
import type {
    DoulaVoucherBaseForm,
    GetVoucherDoulaParams,
    GetVoucherParams,
    VoucherBaseForm,
    VoucherDeleteRequest,
    VoucherRequest,
    VoucherResponse
} from "../schema/VoucherSchema";

export const GetAllVoucher = async (
    params: GetVoucherParams
): Promise<VoucherBaseForm> => {
    const response = await axiosInstance.get<VoucherBaseForm>(
        API_ENDPOINTS.API_VOUCHERS,
        { params }
    )
    return response.data
}

export const CreateVoucher = async (
    data: VoucherRequest
): Promise<VoucherResponse> => {
    const response = await axiosInstance.post<VoucherResponse>(
        API_ENDPOINTS.API_VOUCHERS,
        data
    )
    return response.data
}

export const GetVoucherDetail = async (
    id?: string
): Promise<VoucherResponse> => {
    const response = await axiosInstance.get<VoucherResponse>(
        API_ENDPOINTS.API_VOUCHERS_ID(id)
    )
    return response.data
}

export const EditVoucher = async (
    id: string,
    data: VoucherDeleteRequest
): Promise<VoucherResponse> => {
    const response = await axiosInstance.put<VoucherResponse>(
        API_ENDPOINTS.API_VOUCHERS_ID(id),
        data
    )
    return response.data
}

export const GetAllDoulaVoucher = async (
    params: GetVoucherDoulaParams
): Promise<DoulaVoucherBaseForm> => {
    const response = await axiosInstance.get<DoulaVoucherBaseForm>(
        API_ENDPOINTS.API_DOULA_VOUCHER,
        { params }
    )
    return response.data
}