export interface VoucherParams {
    page?: number,
    limit?: number,
    offset?: number,
    search?: string ,
    sort?: "code" | "status" | "createdAt" | "startDate" | "type" | "amount" | string,
    f_code?: string,
    f_status?: "active" | "inactive" | "expired",
    f_type?: "fixed" | "percent"
}

export interface GetVouchersResponse {
    message: string,
    data: Voucher[],
    metadata: {
        page: number,
        limit: number,
        totalPages: number,
        totalCount: number,
        hasNextPage: boolean
    }
}

export interface Voucher {
    id: string,
    code?: string,
    description?: string,
    startDate?: string,
    endDate?: string | null,
    status: "active" | "inactive",
    type: "percentage" | "fixed",
    amount?: number,
    quantityUse?: number,
    minPayAmount?: number,
    maxDiscountAmount?: number,
    stripeCouponId?: null,
    createdBy: string,
    updatedBy: string | null,
    createdAt: string,
    updatedAt: string | null,
    totalDoulas?: number,
    numOfUsed? : number
}