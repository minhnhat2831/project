export interface EditAdminResquest {
    username : string,
    password?: string | null,
    firstName: string,
    lastName: string,
    status: "active" | "inactive" | string,
    picture?: string | null,
    email : string
}

export interface EditAdminsResponse{
    message : string,
    data : boolean
}
