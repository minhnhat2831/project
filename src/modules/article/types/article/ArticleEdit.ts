export interface ArticleEditRequest {
    title: string,
    content: string,
    picture?: string,
    status: "published" | "unpublished" | "draft" | string,
    type: string,
    timeToRead: number,
    categoryId: string,
    author: string
}

export interface ArticleEditResponse {
    message: string,
    data: {
        id: string,
        title: string,
        content: string,
        picture?: string,
        status: "published" | "unpublished" | "draft" | string,
        type: string,
        timeToRead: number,
        categoryId: string,
        author: {
            id: string,
            firstName: string,
            lastName: string
        },
        updatedAt: string | null,
        createdAt: string,
        slug: string,
        deletedAt: string | null,
        authorId: string,
        category: {
            id: string,
            name: string
        }
    }
}