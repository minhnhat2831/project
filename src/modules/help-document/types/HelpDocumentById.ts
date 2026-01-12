export interface HelpDocumentIdRequest {
    title: string,
    content: string,
    status: "active" | "inactive" | string
}

export interface HelpDocumentIdResponse {
    message: string,
    data: HelpDocumentId
}

export interface HelpDocumentId {
    id: string,
    title: string,
    content: string,
    status: "active" | "inactive" | string,
    createdAt: string,
    updatedAt: string | null,
    deletedAt: string | null
}