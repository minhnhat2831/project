export interface ClientEditRequest{
    firstName?: string,
    middleName?: string,
    lastName?: string,
    picture?: string,
    birthDate?: string,
    email?: string,
    phoneNumber?: string,
    status?: "active" | "inactive"
    verifiedEmail?: boolean,
    countryCode?: string,
    verifiedPhoneNumber?: boolean,
}

export interface ClientEditResponse{
  message: string,
  data: ClientEdit
}

export interface ClientEdit {
    fullName?: string
    id?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    accountType?: string,
    picture?: string,
    birthDate?: string,
    addressId?: string,
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
    createdAt: string,
    updatedAt?: string
  }