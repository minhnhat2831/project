export interface DoulaRequest {
    title?: string,
    shortDes?: string,
    description?: string,
    photos?: [string],
    qualifications?: [string],
    categoryIds: [string],
    status: "active" | "inactive",
    subscription?: {
        id: string,
        priceName: string
    }
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
