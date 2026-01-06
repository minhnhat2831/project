export interface HelpDocumentEditRequest {
    title: string,
    content: string,
    status: "active" | "inactive"
}

export interface HelpDocumentEditResponse {
    message: string,
    data: {
        id: string,
        title: string,
        content: string,
        status: "active" | "inactive",
        createdAt: string,
        updatedAt: string | null,
        deletedAt: string | null
    }
}