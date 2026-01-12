export interface HelpDocumentCreateRequest {
    title: string,
    content: string,
    status: "active" | "inactive" | string
}

export interface HelpDocumentCreateResponse {
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