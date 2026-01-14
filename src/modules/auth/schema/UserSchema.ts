import * as z from "zod";

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export const LoginRequestSchema = z.object({
    username: z.string().min(1, "This filed is required"),
    password: z.string().min(1, "This filed is required")
})

export type LoginResponse = z.infer<typeof LoginResponseSchema>
export const LoginResponseSchema = z.object({
    message: z.string(),
    data: z.object({
        admin: z.object({
            id: z.string(),
            username: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            role: z.string(),
            status: z.enum(["active", "inactive"]),
            email: z.email(),
            picture: z.string().nullable().optional(),
            createAt: z.string(),
            deletedAt: z.string().nullable(),
            updatedAt: z.string().nullable(),
        }),
        tokens: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
        })
    })
})