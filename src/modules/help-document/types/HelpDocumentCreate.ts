export interface HelpDocumentCreateRequest {
    title: string,
    content: string,
    status: "active" | "inactive"
}

export interface HelpDocumentCreateResponse {
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