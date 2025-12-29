export interface GetClientIdResponse{
    message :string,
    data : ClientId
}

export interface ClientId{
    fullName?: string,
    id: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    birthDate?: Date,
    email?: string,
    phoneNumber?: string,
    googleId?: string,
    appleId?: string,
    status: "active" | "inactive"
    verifiedEmail?: boolean,
    countryCode?: string,
    verifiedPhoneNumber?: boolean,
    updatedBy?: string,
    deletedBy?: string,
    deActiveAt?: string,
    isExternal?: boolean,
    createdAt: Date,
    updatedAt?: Date,
    address?: {
        fullAddress?: string,
        latitude : number,
        longitude : number
    },
    picture?: {
        id: string,
        uri?: string,
        type?: string,
        metadata?: {
            thumb? : {
                uri?: string,
                key?: string
            },
            medium? : {
                uri? : string,
                key? : string
            }
        },
        createdAt: Date
    }
}