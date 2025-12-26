export interface GetClientParams {
    search?: string,
    sort?: string,
    page: number,
    limit: number,
    offset?: number,
    f_email?: string,
    f_firstName?: string,
    f_lastName?: string,
    embed : string
}

export interface GetClientResponse {
    message: string,
    data: Client[],
    metadata: {
        page: number,
        limit: number,
        totalPages: number,
        totalCount: number,
        hasNextPage: boolean
    }
}

export interface Client {
    fullName?: string | null,
    id: string,
    firstName?: string | null,
    middleName?: string | null,
    lastName?: string | null,
    birthDate?: Date | null,
    email?: string | null,
    phoneNumber?: string | null,
    googleId?: string | null,
    appleId?: string | null,
    status: "active" | "inactive"
    verifiedEmail?: boolean,
    countryCode?: string | null,
    verifiedPhoneNumber?: boolean,
    updatedBy?: string | null,
    deletedBy?: string | null,
    deActiveAt?: string | null,
    isExternal?: boolean,
    createdAt: Date,
    updatedAt?: Date | null,
    address: {
        fullAddress?: string | undefined
    },
    picture?: {
        id: string,
        uri?: string,
        type?: string,
        metadata?: {
            thumb: {
                uri: string,
                key: string
            },
            medium: {
                uri: string,
                key: string
            }
        },
        createdAt: Date
    } | null
}