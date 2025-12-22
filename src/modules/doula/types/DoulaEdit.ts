export interface GetDoulaEditId{
    id : string
}

export interface GetDoulaEditRequest {
    user : {
        countryCode : string,
        phoneNumber :  string,
    },
    deletedPhotos? : [
        string
    ],
    newPhotos : [
        string
    ],
    title? : string,
    description? : string,
    qualifications? :  [string],
    categoryIds : [string],
    businessName? : string,
    status: "active" | "inactive",
}

export interface GetDoulaEditResponse {
    message: string,
    data: Doula[]
}

export interface Doula {
    id: string,
    title?: string,
    description?: string,
    businessName?: string | null,
    status: "active" | "inactive",
    photos?: [string],
    qualifications?: [string],
    createdAt: Date,
    updatedAt?: Date | null,
    deletedAt?: Date | null,
    cometChatUid: string,
    user: {
        fullName: string,
        firstName: string,
        middleName?: string,
        lastName?: string,
        picture?: string,
        birthDate: Date
    },
    categories?: [
        {
            id: string,
            image: string,
            name: string,
            title: string
        }
    ],
    address: {
        id: string,
        fullAddress: string,
    }
}