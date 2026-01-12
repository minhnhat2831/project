export interface GetDoulaParams {
    search?: string,
    sort?: "user.firstName" | "user.lastName" | "user.email" | "status" | "createdAt" | string,
    page?: number,
    limit?: number,
    offset?: number,
    f_title?: string,

}

export interface GetDoulaResponse {
    message: string,
    data: AdminDoula[],
    metadata: {
        page: number
        limit: number
        totalPages: number
        totalCount: number
        hasNextPage: boolean
    }
}

export interface AdminDoula {
    id: string,
    title: string,
    status: "active" | "inactive" | string,
    user: {
        fullName?: string,
        firstName?: string,
        middleName?: string | null,
        lastName?: string,
        birthDate?: Date,
        email?: string,
        phoneNumber? : string,
        countryCode?: string | null,
    },
    address: {
        id?: string,
        fullAddress?: string
    }
    picture?: {
        id: string
        uri?: string | null
        type: string
        metadata?: {
            thumbnail: {
                uri: string,
                key: string,
            },
            medium: {
                uri: string,
                key: string,
            }
        } | null,
        createdAt: Date
    }
}