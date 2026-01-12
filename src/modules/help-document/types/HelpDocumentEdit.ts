export interface HelpDocumentEditRequest {
    title: string,
    content: string,
    status: "active" | "inactive" | string
}

export interface HelpDocumentEditResponse {
    message: string,
    data: {
        id: string,
        title: string,
        content: string,
        status: "active" | "inactive" | string,
        createdAt: string,
        updatedAt: string | null,
        deletedAt: string | null
    }
}