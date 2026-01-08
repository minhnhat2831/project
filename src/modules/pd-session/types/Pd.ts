export interface GetPdParams {
    page? : number,
    limit? : number,
    offset? : number,
    search? : string,
    sort? : "id" | "title" | "status" | "author" | "createdAt" | "updatedAt" | "category.name" | "index" | string,
    f_type? : "article" | "pd",
    f_categoryId? : string,
    f_status? : "published" | "unpublished" | "draft"
}

export interface PdResponse {
    message : string,
    data : Pd[],
    metadata : {
        page : number,
        limit : number,
        totalPages : number,
        totalCount : number,
        hasNextPage : boolean
    }
}

export interface Pd {
    id : string,
    slug : string,
    title : string,
    picture? : {
        id? : string,
        uri? : string,
        type? : string,
        metadata? : {
            thumb? : {
                uri? : string,
                key? : string
            },
            medium? : {
                uri? : string,
                key? : string
            }
        },
        createdAt? : string
    },
    content : string,
    status : "published" | "unpublished" | "draft",
    type : string,
    author : string,
    categoryId : string,
    timeToRead : number | null,
    createdAt : string,
    updatedAt? : string | null,
    category? : {
        id : string,
        name : string
    }
}