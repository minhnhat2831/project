export interface DoulaPackage {
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