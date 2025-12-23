export interface GetTransactions {
    message: string,
    data: Transaction[],
    metadata: {
        page: number,
        limit: number,
        totalPages: number,
        totalCount: number,
        hasNextPage: boolean
    }
}

export interface Transaction {
    id: string,
    stripeInvoiceId: string,
    stripeSubscriptionId: string,
    stripeCustomerId: string,
    amount: number,
    type: string,
    last4: number,
    brand: string,
    totalAmount: number,
    discount: number,
    status: "success" | "failed",
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null
}

export interface TransactionParams {
    search?: string,
    sort?: string,
    page?: number,
    limit?: number,
    offset?: number,
    f_doulaId?: string,
}