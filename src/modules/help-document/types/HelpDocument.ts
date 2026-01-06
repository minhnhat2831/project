export interface HelpDocumentParams {
    page? : number,
    limit? : number,
    offset? : number,
    search? : string | null
    sort? : "createdAt" | "title" | string
}

export interface HelpDocumentRequest {
    title : string,
    content : string,
    status : "active" | "inactive"
}

export interface HelpDocumentResponse {
    message : string,
    data : HelpDocument[],
    metadata : {
        page? : number,
        limit? : number,
        totalPages? : number,
        totalCount? : number,
        hasNextPage : boolean
    }
}

export interface HelpDocument {
    id : string,
    title : string,
    content : string,
    status : "active" | "inactive",
    createdAt : string,
    updatedAt : string | null
}