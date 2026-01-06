export interface HelpDocumentIdRequest {
    title: string,
    content: string,
    status: "active" | "inactive"
}

export interface HelpDocumentIdResponse {
    message: string,
    data: HelpDocumentId
}

export interface HelpDocumentId {
    id: string,
    title: string,
    content: string,
    status: "active" | "inactive",
    createdAt: string,
    updatedAt: string | null,
    deletedAt: string | null
}