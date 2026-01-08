export interface PdEditRequest {
    title: string,
    content: string,
    picture: {
        id?: string,
        uri?: string,
        type?: string,
        metadata?: {
            thumb?: {
                uri?: string,
                key?: string
            },
            medium?: {
                uri?: string,
                key?: string
            }
        },
        createdAt?: string
    },
    status: "published" | "unpublished" | "draft",
    type?: string,
    timeToRead?: number | null,
    categoryId: string,
    author: string
}

export interface PdEditResponse {
    message: string,
    data: {
        id: string,
        title: string,
        content: string,
        picture: {
            id?: string,
            uri?: string,
            type?: string,
            metadata?: {
                thumb?: {
                    uri?: string,
                    key?: string
                },
                medium?: {
                    uri?: string,
                    key?: string
                }
            },
            createdAt?: string
        },
        status: "published" | "unpublished" | "draft",
        type?: string,
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