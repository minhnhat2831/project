export interface GetDoulaParams {
    search?: string,
    sort?: string,
    page?: number,
    limit?: number,
    offset?: number,
    f_title?: string,

}

export interface GetDoulaResponse {
    message: string,
    data: Doula[],
    metadata: {
        page: number
        limit: number
        totalPages: number
        totalCount: number
        hasNextPage: boolean
    }
}

export interface Doula {
    id: string,
    title: string,
    status: string,
    user: {
        fullName?: string,
        firstName?: string,
        middleName?: string | null,
        lastName?: string,
        birthDate?: Date,
        email?: string,
        phoneNumber? : string | null
    },
    address: {
        id?: string,
        fullAddress?: string
    }
    picture: {
        id: string
        uri?: string
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