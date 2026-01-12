export interface GetArticleParams {
    page?: number,
    limit?: number,
    offset?: number,
    search?: string,
    sort?: "id" | "title" | "status" | "author" | "createdAt" | "updatedAt" | "category.name" | "index" | string,
    f_type?: "article" | "pd",
    f_categoryId?: string,
    f_status?: "published" | "unpublished" | "draft"
}

export interface ArticleResponse {
    message: string,
    data: Article[],
    metadata: {
        page: number,
        limit: number,
        totalPages: number,
        totalCount: number,
        hasNextPage: boolean
    }
}

export interface Article {
    id: string,
    slug: string,
    title: string,
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
    content: string,
    status: "published" | "unpublished" | "draft" | string,
    type: string,
    author: string,
    categoryId: string,
    timeToRead: number,
    createdAt: string,
    updatedAt: string | null,
    category: {
        id: string,
        name: string
    }
}