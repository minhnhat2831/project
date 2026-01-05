import axiosInstance from "@/services/axios";
import type { GetVouchersResponse, VoucherParams } from "../types/Voucher";
import { API_ENDPOINTS } from "@/services/api";
import type { VoucherCreateRequest, VoucherCreateResponse } from "../types/VoucherCreate";
import type { GetVoucherIdResponse } from "../types/VoucherId";
import type { VoucherEditRequest, VoucherEditResponse } from "../types/VoucherEdit";
import type { DoulaVoucherParams, DoulaVoucherResponse } from "../types/DoulaVoucher";

export const GetAllVoucher = async (
    params : VoucherParams
) : Promise<GetVouchersResponse> => {
    const response = await axiosInstance.get<GetVouchersResponse>(
        API_ENDPOINTS.API_VOUCHERS,
        {params}
    )
    return response.data
}

export const CreateVoucher = async (
    data : VoucherCreateRequest
):Promise<VoucherCreateResponse> => {
    const response = await axiosInstance.post<VoucherCreateResponse>(
        API_ENDPOINTS.API_VOUCHERS,
        data
    )
    return response.data
}

export const VoucherById = async (
    id : string
):Promise<GetVoucherIdResponse> => {
    const response = await axiosInstance.get<GetVoucherIdResponse>(
        API_ENDPOINTS.API_VOUCHERS_ID(id)
    )
    return response.data
}

export const EditVoucher = async (
    id : string,
    data : VoucherEditRequest
): Promise<VoucherEditResponse> => {
    const response = await axiosInstance.put<VoucherEditResponse>(
        API_ENDPOINTS.API_VOUCHERS_ID(id),
        data
    )
    return response.data
}

export const GetDoulaVoucher = async (
    params : DoulaVoucherParams
) : Promise<DoulaVoucherResponse> => {
    const response = await axiosInstance.get<DoulaVoucherResponse>(
        API_ENDPOINTS.API_DOULA_VOUCHER,
        {params}
    )
    return response.data
}