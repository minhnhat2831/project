export interface Admin {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  role: string
  status: "active" | "inactive"
  picture?: string
  createdAt: string
  updatedAt?: string
  picture2?: {
    id: string
    uri: string
    type: string
    metadata?: string | null
    createdAt: string
  } | null
}

export interface GetAdminsResponse {
  message: string
  data: Admin[]
  metadata: {
    page: number
    limit: number
    totalPages: number
    totalCount: number
    hasNextPage: boolean
  }
}

// Params 
export interface GetAdminsParams {
  page?: number
  limit?: number
  offset?: number
  search?: string | null
  sort?: string 
  f_username?: string
  f_email?: string
}
