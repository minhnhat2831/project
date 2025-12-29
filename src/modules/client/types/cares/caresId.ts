export interface CaresIdResponse {
    message: string,
    data: CaresId
}

export interface CaresId {
    id : string,
    doulaId : string,
    userId : string,
    doulaPackageId : string
    status : "active" | "inactive",
    startDate : string,
    createdAt : string,
    updatedAt ?: string,
    deletedAt ?: string | null,
    endDate ?: string | null,
}