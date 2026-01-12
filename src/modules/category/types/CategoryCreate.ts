export interface CreateCategoryRequest {
    title : string,
    name : string,
    image : string,
    status : "active" | "inactive" | string
}

export interface CreateCategoryResponse {
    message : string,
    data : {
        id : string,
        title : string,
        name : string,
        image : string,
        status : "active" | "inactive",
        slug : string,
        updatedAt : string | null,
        createdAt : string,
        deletedAt : string | null
    }
}