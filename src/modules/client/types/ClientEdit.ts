export interface ClientEditRequest{
    firstName?: string,
    middleName?: string,
    lastName?: string,
    picture?: string,
    birthDate?: Date,
    email?: string,
    phoneNumber?: string,
    status: "active" | "inactive"
    verifiedEmail: boolean,
    countryCode: string,
    verifiedPhoneNumber: boolean
}

export interface ClientEditResponse{
  message: string,
  data: {
    fullName?: string
    id: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    accountType?: string,
    picture?: string,
    birthDate?: Date,
    addressId?: string,
    email?: string,
    phoneNumber?: string,
    googleId?: string,
    appleId?: string,
    status: "active" | "inactive"
    verifiedEmail?: boolean,
    countryCode?: string,
    verifiedPhoneNumber?: boolean,
    updatedBy?: Date,
    deletedBy?: Date,
    createdAt: Date,
    updatedAt?: Date
  }
}