export interface DoulaVoucherParams {
    f_doulaId?: string,
    f_voucherId?: string,
    page?: number,
    limit?: number,
    offset?: number,
    sort?: string,
    search?: string
}

export interface DoulaVoucherResponse {
    message: string,
    data: DoulaVoucher[],
    metadata: {
        page: number,
        limit: number,
        totalPages: number,
        totalCount: number,
        hasNextPage: boolean
    }
}

export interface DoulaVoucher {
    id: string,
    doulaId: string,
    voucherId: string,
    status: "success" | "canceled" | "applied",
    createdAt: string,
    updatedAt: string,
    doulaUser?: {
        fullName?: string,
        id?: string,
        firstName?: string,
        middleName?: string | null,
        lastName?: string,
        picture: {
            id?: string,
            uri?: string,
            type?: string,
            metadata?: {
                thumb?: {
                    uri?: string,
                    key?: string
                },
                medium?: {
                    uri?: string,
                    key?: string
                }
            },
            createdAt?: string
        },
    }
}