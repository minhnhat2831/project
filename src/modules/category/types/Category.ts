export interface GetCategoryParams {
    page? : number,
    limit? : number,
    offset?: number,
    search? : string | null,
    sort? : "createdAt" | "name" | string,
    f_name? : string | null
}

export interface GetCategoryList {
    message : string,
    data : Category[],
    metadata : {
        page? : number,
        limit? : number,
        totalPages? : number,
        totalCount? : number,
        hasNextPage : boolean
    }
}

export interface Category {
    id : string,
    name : string,
    title : string,
    picture?: {
        id: string
        uri?: string | null
        type?: string
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
    },
    status : "active" | "inactive",
    slug : string,
    createdAt : string,
    updatedAt : string | null
}