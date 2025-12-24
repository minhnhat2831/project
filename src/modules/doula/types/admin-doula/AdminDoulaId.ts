export interface GetDoulaId {
    id: string
}

export interface GetDoulaIdResponse {
    message: string,
    data: Doula
}

export interface Doula {
    id: string,
    title?: string,
    description?: string,
    businessName?: string | null,
    status: "active" | "inactive",
    isTrialed: boolean,
    stripeCustomerId: string,
    photos: [{
        id: string,
        media: {
            createdAt: string,
            id: string,
            metadata: {
                medium: {
                    key: string,
                    uri: string,
                },
                thumbnail: {
                    key: string,
                    uri: string,
                }
            },
            type: string,
            uri: string,
        }
    }],
    picture?: {
        id: string,
        createdAt: string,
        metadata: {
            medium: {
                key: string,
                uri: string,
            },
            thumbnail: {
                key: string,
                uri: string,
            }
        },
        type: string,
        uri: string,
    },
    qualifications?: [string],
    createdAt: string,
    updatedAt?: string | null,
    deletedAt?: string | null,
    deletedBy?: string | null,
    cometChatUid: string,
    starAvg: number,
    user: {
        fullName: string,
        firstName: string,
        middleName?: string,
        lastName?: string,
        phoneNumber: string,
        birthDate: string | null,
        countryCode: string,
        email: string,
        id: string
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