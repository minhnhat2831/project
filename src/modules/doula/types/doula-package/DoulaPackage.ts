export interface DoulaPackageResponse{
    message : string,
    data : DoulaPackage[],
    metadata: {
        page: number
        limit: number
        totalPages: number
        totalCount: number
        hasNextPage: boolean
    }
}

export interface DoulaPackage{
    id : string,
    doulaId : string,
    name : string,
    price : string,
    numberOfClients : number,
    createdAt : string,
    doula : {
        id : string,
        user : {
            firstName : string | null,
            fullName : string | null,
            id : string,
            lastName : string | null,
            middleName : string | null
        }
    },
    picture : {
        createdAt : string,
        id : string,
        type : string,
        uri : string,
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
    }
}

export interface DoulaPackageParams{
    search?: string,
    sort?: string,
    page?: number,
    limit?: number,
    offset?: number,
    f_doulaId?: string,
}