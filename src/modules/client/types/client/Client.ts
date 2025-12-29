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
    fullName?: string,
    id: string,
    firstName?: string ,
    middleName?: string ,
    lastName?: string,
    birthDate?: Date ,
    email?: string,
    phoneNumber?: string,
    googleId?: string,
    appleId?: string,
    status: "active" | "inactive"
    verifiedEmail?: boolean,
    countryCode?: string,
    verifiedPhoneNumber?: boolean,
    updatedBy?: string,
    deletedBy?: string,
    deActiveAt?: string,
    isExternal?: boolean,
    createdAt: Date,
    updatedAt?: Date,
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