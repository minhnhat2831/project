export interface GetAllCaresResponse {
    message: string,
    data: Cares[],
    metadata: {
        totalPages: number,
        page: number,
        limit: number,
        totalCount: number,
        hasNextPage: boolean
    }
}

export interface Cares {
    id: string,
    doulaId: string,
    userId: string,
    title: string,
    doulaPackageId: string,
    status: "active" | "inactive",
    startDate: string,
    createdAt: string,
    updatedAt?: string,
    deletedAt?: string | null,
    endDate?: string | null,
    user: {
        fullName: string,
        middleName: string,
        picture: string,
        firstName: string,
        lastName: string
    },
    doula: {
        title: string,
        user: {
            fullName: string,
            middleName: string,
            picture: string,
            firstName: string,
            lastName: string,
        }
    },
    doulaPackage: {
        name: string,
    }
}

export interface GetCaresParams {
    page?: number,
    limit?: number,
    search?: string,
    offset? : number,
    sort? : "createdAt" | "startDate" | "endDate" | string,
    f_userId? : string,
    f_doulaId? : string,
    f_status? : "active" | "completed"
}