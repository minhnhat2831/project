import type { GetDoulaParams, GetDoulaResponse } from "../types/Doula";
import axiosInstance from "../../../services/axios";
import { API_ENDPOINTS } from "../../../services/api";
import type { GetDoulaId } from "../types/DoulaId";
import type { GetDoulaEditRequest, GetDoulaEditResponse } from "../types/DoulaEdit";
import type { DeleteAdminsResponse } from "../../admin/types/DeleteAdmin";

export const GetAllDoula = async (
    params : GetDoulaParams
) : Promise<GetDoulaResponse> => {
    const respond = await axiosInstance.get<GetDoulaResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA,
        {
            params
        }
    )
    return respond.data;
}

export const GetById = async (
    id : string
): Promise<GetDoulaId> => {
    const respond = await axiosInstance.get<GetDoulaId>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id)
    )
    return respond.data
}

export const DoulaEdit = async (
    id : string,
    data : GetDoulaEditRequest
) : Promise<GetDoulaEditResponse> => {
    const respond = await axiosInstance.put<GetDoulaEditResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id),
        {data}
    )
    return respond.data
}

export const DoulaDelete = async (
    id : string
) : Promise<DeleteAdminsResponse> => {
    const respond = await axiosInstance.delete<DeleteAdminsResponse>(
        API_ENDPOINTS.API_ADMIN_DOULA_ID(id)
    )
    return respond.data
}
