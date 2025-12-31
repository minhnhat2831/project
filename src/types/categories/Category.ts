export interface GetCategoriesParams {
    page? : number,
    limit? : number,
    offset? : number,
    search? : string | null,
    sort? : "createdAt" | "name",
    f_name? : string | null,
    f_status? : "active" | "inactive"
}

export interface GetCategoriesResponse {
    message : string,
    data : Category[],
    metadata : {
        page : number,
        limit : number,
        totalPages : number,
        totalCount : number,
        hasNextPage : boolean
    }
}

export interface Category {
    id : string,
    name : string,
    title : string,
    image : string,
    status : "active" | "inactive",
    slug : string,
    createdAt : string,
    updatedAt : string | null
}