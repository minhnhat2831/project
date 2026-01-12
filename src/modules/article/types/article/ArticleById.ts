export interface ArticleIdResponse {
    message: string,
    data: ArticleById
}

export interface ArticleById {
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
    updatedAt: string | null,
    category: {
        id: string,
        name: string
    },
   picture?: {
        id: string
        uri: string
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
        } ,
        createdAt: string
    }
}