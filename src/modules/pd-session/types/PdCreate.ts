export interface PdCreateRequest {
    title: string,
    content: string,
    picture?: string,
    status: "published" | "unpublished" | "draft" | string,
    type: "article" | "pd" | string,
    timeToRead: number,
    categoryId: string,
    author: string
}

export interface PdCreateResponse {
    message: string,
    data: {
        id: string,
        title: string,
        content: string,
        picture?: {
            id: string,
            uri: string,
            type: string,
            metadata: {
                thumb: {
                    uri: string,
                    key: string
                },
                medium: {
                    uri: string,
                    key: string
                }
            },
            createdAt?: string
        },
        status: "published" | "unpublished" | "draft" | string,
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