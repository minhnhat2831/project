import * as z from "zod"

const required = "This field is required"

export type DoulaRequest = z.infer<typeof DoulaRequestSchema>;

const UserSchema = z.object({
    countryCode: z.string().nullable().optional(),
    phoneNumber: z.string().min(8, "Phone number must be from 8 to 20 characters.")
})

export const DoulaRequestSchema = z.object(
    {
        user: UserSchema,
        status: z.string().min(1, required),
    })

export type GetDoulaParams = z.infer<typeof GetDoulaParamsSchema>;
export const GetDoulaParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_title: z.string().optional(),
});

export type Doula = z.infer<typeof DoulaSchema>
export const DoulaSchema = z.object({
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

export type DoulaBaseForm = z.infer<typeof DoulaBaseFormSchema>
export const DoulaBaseFormSchema = z.object({
    message: z.string(),
    data: z.array(DoulaSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export type DoulaResponse = z.infer<typeof DoulaResponseSchema>
export const DoulaResponseSchema = z.object({
    message: z.string(),
    data: DoulaSchema
})

export type DeleteDoulaResponse = z.infer<typeof DeleteDoulaResponseSchema>
export const DeleteDoulaResponseSchema = z.object({
    message: z.string(),
    data: z.boolean()
})

const Categories = z.object({
    id: z.string(),
    image: z.string(),
    name: z.string(),
    title: z.string()
})

const Photo = z.object({
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

export type DoulaDetail = z.infer<typeof DoulaDetailSchema>
export const DoulaDetailSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    businessName: z.string(),
    status: z.enum(["active", "inactive"]),
    createdAt: z.string(),
    isTrialed: z.boolean(),
    stripeCustomerId: z.string(),
    photos: z.array(Photo),
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
    categories: z.array(Categories)
})

export type DoulaDetailResponse = z.infer<typeof DoulaDetailResponseSchema>
export const DoulaDetailResponseSchema = z.object({
    message: z.string(),
    data: DoulaDetailSchema
})