export interface EditCategoryRequest {
    title: string,
    name: string,
    image: string | null,
    status: "active" | "inactive" | string
}

export interface EditCategoryResponse {
    message: string,
    data: {
        id: string,
        slug: string,
        title: string,
        picture: string | null,
        content: string,
        status: "active" | "inactive",
        type: string,
        authorId: string,
        categoryId: string,
        timeToRead: number,
        createdAt: string,
        updatedAt: string | null,
        category: {
            id: string,
            name: string
        },
        author: {
            id: string,
            firstName: string,
            lastName: string
        }
    }
}