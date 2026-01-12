export interface VoucherEditRequest {
    code?: string,
    description?: string,
    startDate?: string,
    endDate?: string,
    status: "active" | "inactive" | string,
    type?: "fixed" | "percentage" | string,
    amount?: number,
    quantityUse?: number,
    minPayAmount?: number,
    maxDiscountAmount?: number
}

export interface VoucherEditResponse {
    message: string,
    data: {
        id : string,
        code: string,
        description: string,
        startDate: string,
        endDate: string,
        status: "active" | "inactive" | string,
        type: "fixed" | "percentage" | string,
        amount: number,
        stripeCouponId: string,
        minPayAmount: number,
        maxDiscountAmount: number,
        createdBy : string,
        updatedBy : string | null,
        createdAt : string,
        updatedAt : string | null,
        deletedAt : string | null
    }
}