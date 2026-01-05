export interface GetVoucherIdResponse {
    message: string,
    data: VoucherId
}

export interface VoucherId {
    id: string,
    code: string,
    description: string,
    startDate: string,
    endDate: string | null,
    status: "active" | "inactive",
    type: "percentage" | "fixed",
    amount: number,
    quantityUse: number,
    minPayAmount: number,
    maxDiscountAmount: number,
    stripeCouponId: null,
    createdBy: string,
    updatedBy: string | null,
    createdAt: string,
    updatedAt: string | null,
    numOfUsed : string
}