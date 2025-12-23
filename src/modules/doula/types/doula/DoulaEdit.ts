export interface DoulaEditRequest {
    deletedPhotos? : [string],
    newPhotos? : [string],
    title? : string,
    description? : string,
    qualifications? : [string],
    categoryIds? : [string],
    businessName? : string
}

export interface DoulaResponse {
    message: string,
    data: {
        title?: string,
        shortDes?: string,
        description?: string,
        photos?: [string],
        qualifications?: [string],
        status : "active | inactive",
        id : string,
        updatedAt? : Date,
        createdAt? : Date,
        deletedAt? : Date
    },

}