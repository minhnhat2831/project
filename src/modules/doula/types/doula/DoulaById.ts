export interface DoulaByIdResponse {
    message: string,
    data: DoulaById[]
}

export interface DoulaById {
    id: string
    title: string
    description: string | null
    businessName: string | null
    starAvg: number
    status: "active" | "inactive"
    qualifications: string | null
    stripeCustomerId: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    cometChatUid: string

    user: DoulaUser
    categories: Category[]
    address: Address
    picture: Picture[]
    photos: Photo[]
}

export interface DoulaUser {
    fullName: string
    firstName: string
    middleName: string
    lastName: string
    birthDate: string
    email: string
}

export interface Category {
    id: string
    image: string
    name: string
    title: string
}

export interface Address {
    id: string
    fullAddress: string
}

export interface Photo {
    id: string
    media: {
        id: string
        uri: string
        type: string
        metadata: {
            thumbnail: {
                uri: string
                key: string
            }
            medium: {
                uri: string
                key: string
            }
        }
        createdAt: string
    }
}

export interface Picture {
    id: string
    uri: string
    type: string
    metadata: {
        thumbnail: {
            uri: string
            key: string
        }
        medium: {
            uri: string
            key: string
        }
    }
    createdAt: string
}
