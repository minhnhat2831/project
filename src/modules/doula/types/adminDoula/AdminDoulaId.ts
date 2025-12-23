export interface GetDoulaId {
    id: string
}

export interface GetDoulaIdResponse {
    message: string,
    data: Doula[]
}

export interface Doula {
    id: string,
    title?: string,
    description?: string,
    businessName?: string | null,
    status: "active" | "inactive",
    photos?: [],
    qualifications?: [],
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