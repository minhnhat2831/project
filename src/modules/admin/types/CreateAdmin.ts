export interface CreateAdmin {
    username : string,
    password: string,
    firstName: string,
    lastName: string,
    status?: "active" | "inactive",
    picture?: string | null,
    email : string
}

export interface CreateAdminsResponse {
  message : string,
  data: {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    status?: "Active" | "Inactive",
    picture?: string | null,
    email: string,
    role: string,
    picture2?: {
      id: string,
      converted: boolean,
      uri: string,
      type: string,
      resourceId: string,
      updatedAt?: Date | null,
      createdAt: Date,
      metadata: null,
      deletedAt?: string | null
    } | null,
    updatedAt?: Date | null,
    createdAt: Date
  }
}