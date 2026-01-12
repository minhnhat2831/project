export interface PDIdResponse {
    message: string,
    data: PDId
}

export interface PDId {
    id: string,
    slug: string,
    title: string,
    content: string,
    status: "published" | "unpublished" | "draft" | string,
    type: string,
    author: string,
    categoryId: string,
    timeToRead: number,
    createdAt: string,
    updatedAt?: string | null,
    category?: {
        id: string,
        name: string
    },
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
}