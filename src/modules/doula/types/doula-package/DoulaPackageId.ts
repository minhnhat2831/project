export interface DoulaPackageIdResponse {
    message: string,
    data: DoulaPackageId
}

export interface DoulaPackageId {
    id: string | null,
    doulaId: string | null,
    name: string | null,
    price: string | null,
    description?: string | null,
    shortDescription: string | null,
    image: string | null,
    qualifications: [string],
    createdAt: string | null,
    updatedAt: string | null,
    deletedAt: string | null,
    cares: Cares[],
    picture?: {
        createAt: string | null,
        id: string | null,
        type: string | null,
        uri?: string,
        metadata?: {
            thumbnail: {
                uri: string,
                key: string,
            },
            medium: {
                uri: string,
                key: string,
            }
        } | null,
    } | null,

}

export interface Cares {
    id: string | null,
    createdAt: string | null,
    status: "active" | "inactive",
    user: {
        fullName: string | null,
        lastName: string | null,
        firstName: string | null,
        middleName: string | null,
        email: string | null,
        status: "active" | "inactive",
        picture2: string | null,
        picture: {
            createAt: string | null,
            id: string | null,
            type: string | null,
            uri: string,
            metadata?: {
                thumbnail: {
                    uri: string,
                    key: string,
                },
                medium: {
                    uri: string,
                    key: string,
                }
            } | null,
        } ,
    }
}