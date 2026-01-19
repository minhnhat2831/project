import * as z from "zod"

const required = "This field is required"

const userSchema = z.object({
    countryCode: z.string().nullable().optional(),
    phoneNumber: z.string().min(8, "Phone number must be from 8 to 20 characters.")
})

export const doulaRequestSchema = z.object(
    {
        user: userSchema,
        status: z.string().min(1, required),
    })

export const doulaParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_title: z.string().optional(),
});

export const doulaListItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    businessName: z.string(),
    status: z.enum(["active", "inactive"]),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
    cometChatUid: z.string(),
    user: z.object({
        fullName: z.string().optional(),
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
        birthDate: z.string().optional(),
        email: z.string().optional(),
        phoneNumber: z.string().optional(),
        countryCode: z.string().optional(),
    }),
    address: z.object({
        id: z.string().optional(),
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

export const doulaListSchema = z.object({
    message: z.string(),
    data: z.array(doulaListItemSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export const doulaResponseSchema = z.object({
    message: z.string(),
    data: doulaListItemSchema
})

export const deleteDoulaResponseSchema = z.object({
    message: z.string(),
    data: z.boolean()
})

const categories = z.object({
    id: z.string(),
    image: z.string(),
    name: z.string(),
    title: z.string()
})

const photo = z.object({
    id: z.string(),
    media: z.object({
        createdAt: z.string(),
        id: z.string(),
        metadata: z.object({
            medium: z.object({
                key: z.string(),
                uri: z.string(),
            }),
            thumbnail: z.object({
                key: z.string(),
                uri: z.string(),
            })
        }),
        type: z.string(),
        uri: z.string(),
    })
})

export const doulaDetailSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    businessName: z.string(),
    status: z.enum(["active", "inactive"]),
    createdAt: z.string(),
    isTrialed: z.boolean(),
    stripeCustomerId: z.string(),
    photos: z.array(photo),
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
    }).optional(),
    qualifications: z.string().array(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
    deletedBy: z.string().nullable(),
    cometChatUid: z.string(),
    starAvg : z.number(),
    user: z.object({
        fullName: z.string().optional(),
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
        birthDate: z.string().optional(),
        phoneNumber: z.string().nullable(),
        email: z.email(),
        countryCode: z.string().nullable(),
        id: z.string()
    }),
    address: z.object({
        id: z.string().optional(),
        fullAddress: z.string().optional()
    }),
    categories: z.array(categories)
})

export const doulaDetailResponseSchema = z.object({
    message: z.string(),
    data: doulaDetailSchema
})