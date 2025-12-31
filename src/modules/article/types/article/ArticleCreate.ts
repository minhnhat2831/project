export interface ArticleCreateRequest {
    title: string,
    content: string,
    picture: string,
    status: "published" | "unpublished" | "draft" | "",
    type: "article" | "pd",
    timeToRead: string,
    categoryId: string | "",
    author: string
}

export interface ArticleCreateResponse {
    message: string,
    data: {
        id: string,
        title: string,
        content: string,
        picture: string,
        status: "published" | "unpublished" | "draft",
        type: string,
        timeToRead: number,
        categoryId: string,
        author: string,
        updatedAt : string | null,
        createdAt : string,
        slug : string,
        deletedAt : string | null
    }
}