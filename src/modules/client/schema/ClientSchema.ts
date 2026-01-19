import * as z from "zod"

const required = "This field is required"

export const clientParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_email: z.string().optional(),
    f_firstName: z.string().optional(),
    f_lastName: z.string().optional(),
    embed: z.string()
});

export const clientRequestSchema = z.object({
    countryCode: z.string().nullable(),
    phoneNumber: z.coerce.number().min(8, "Phone number must be from 8 to 20 characters.") as z.ZodNumber,
    status: z.string().min(1, required),
})

export const clientListItemSchema = z.object({
    fullName: z.string().optional(),
    id: z.string(),
    firstName: z.string().optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
    birthDate: z.string().optional(),
    email: z.email(),
    phoneNumber: z.number().optional(),
    googleId: z.string().optional(),
    appleId: z.string().optional(),
    status: z.enum(["active", "inactive"]),
    verifiedEmail: z.boolean(),
    countryCode: z.string().nullable(),
    verifiedPhoneNumber: z.boolean().optional(),
    updatedBy: z.string().optional(),
    deletedBy: z.string().optional(),
    deActiveAt: z.string().optional(),
    isExternal: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
    address: z.object({
        fullAddress: z.string().optional()
    }),
    picture: z.object({
        id: z.string().optional(),
        uri: z.string().optional(),
        type: z.string().optional(),
        metadata: z.object({
            thumb: {
                uri: z.string().optional(),
                key: z.string().optional()
            },
            medium: z.object({
                uri: z.string().optional(),
                key: z.string().optional()
            })
        }),
        createdAt: z.string()
    })
})

export const clientListSchema = z.object({
    message: z.string(),
    data: z.array(clientListItemSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export const clientResponseSchema = z.object({
    message: z.string(),
    data: clientListItemSchema
})
