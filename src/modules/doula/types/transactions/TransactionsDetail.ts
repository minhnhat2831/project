export interface GetTransactionDetail {
    message: string,
    data: TransactionDetail[],
    metadata: {
        page: number,
        limit: number,
        totalPages: number,
        totalCount: number,
        hasNextPage: boolean
    }
}

export interface TransactionDetail {
    id: string,
    stripeInvoiceId: string,
    doulaId: string,
    doulaSubscriptionId: string,
    amount: number,
    type: string,
    last4: number,
    brand: string,
    totalAmount: number,
    discount: number,
    status: "success" | "failed",
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
    doulaSubscription: {
        id: string,
        subscriptionPlanName: string,
        status: "active" | "inactive",
        subscription: {
            id: string,
            name: string
        }
    }
}

export interface TransactionParams {
    search?: string,
    sort?: string,
    page?: number,
    limit?: number,
    offset?: number,
    f_doulaId?: string,
}