import type { Guid } from "guid-typescript";

export type{
    loginRequest,
    loginResponse,
    refreshToken
}

interface loginRequest {
    username: string,
    password: string
}

interface loginResponse {
    message: string,
    data: {
        admin: {
            id: Guid,
            username: string,
            firstName: string,
            lastName: string,
            role: string,
            status?: "active" | "inActive",
            email: string,
            picture?: string | null,
            createAt: Date,
            deletedAt?: Date | null,
            updatedAt?: Date | null,
        },
        tokens: {
            accessToken: string,
            refreshToken: string
        }
    }
}

interface refreshToken {
    refreshToken?: string | null
}