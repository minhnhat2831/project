export interface GetCategoryById {
    message : string,
    data : CategoryId
}

export interface CategoryId {
    id : string,
    slug : string,
    title : string,
    name : string,
    picture: {
        id: string
        uri?: string | null
        type?: string
        metadata?: {
            thumbnail?: {
                uri?: string,
                key?: string,
            },
            medium?: {
                uri?: string,
                key?: string,
            }
        } | null,
        createdAt: string
    } | null,
    content : string,
    status : "active" | "inactive",
    type : string,
    authorId : string,
    categoryId : string,
    timeToRead : number,
    createdAt : string,
    updatedAt : string | null,
    category : {
        id : string,
        name : string
    },
    author : {
        id : string,
        firstName : string,
        lastName : string
    }
}