export interface VoucherCreateRequest {
    code: string,
    description: string,
    startDate: string,
    endDate: string,
    status: "active" | "inactive",
    type: "fixed" | "percentage" | string,
    amount: number | string,
    quantityUse: number | string,
    minPayAmount: number | string,
    maxDiscountAmount: number | string
}

export interface VoucherCreateResponse {
    message: string,
    data: {
        id : string,
        code : string,
        description : string,
        startDate : string,
        endDate : string,
        status: "active" | "inactive",
        type: "fixed" | "percentage",
        amount : number,
        minPayAmount : number,
        maxDiscountAmount : number,
        createdBy : string,
        updatedAt : string | null,
        createdAt : string,
        stripeCouponId : string | null,
        updatedBy : string | null,
        deletedAt : string | null
    }
}