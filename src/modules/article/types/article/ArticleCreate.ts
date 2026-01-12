export interface ArticleCreateRequest {
    title: string,
    content: string,
    picture?: string,
    status: "published" | "unpublished" | "draft" | string,
    type: string,
    timeToRead: number,
    categoryId: string,
    author: string
}

export interface ArticleCreateResponse {
    message: string,
    data: {
        id: string,
        title: string,
        content: string,
        picture?: {
            id: string
            uri: string | null
            type: string
            metadata: {
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
        status: "published" | "unpublished" | "draft",
        type: string,
        timeToRead: number,
        categoryId: string,
        author: string,
        updatedAt: string | null,
        createdAt: string,
        slug: string,
        deletedAt: string | null
    }
}