import z from "zod";

export const doulaPackageParamsSchema = z.object({
    search: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    f_doulaId: z.string().optional(),
})

export const doulaPackageListItemSchema = z.object({
    id: z.string(),
    doulaId: z.string(),
    name: z.string(),
    price: z.string(),
    numberOfClients: z.number(),
    createdAt: z.string(),
    doula: {
        id: z.string(),
        user: z.object({
            fullName: z.string(),
            middleName: z.string(),
            id: z.string(),
            firstName: z.string(),
            lastName: z.string(),
        }).nullable(),
    },
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

export const doulaPackageListSchema = z.object({
    message: z.string(),
    data: z.array(doulaPackageListItemSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export const caresListItemSchema = z.object({
    id: z.string().nullable(),
    createdAt: z.string(),
    status: z.enum(["active", "inactive"]),
    user: z.object({
        fullName: z.string().nullable(),
        lastName: z.string().nullable(),
        firstName: z.string().nullable(),
        middleName: z.string().nullable(),
        email: z.string().nullable(),
        status: z.enum(["active", "inactive"]),
        picture2: z.string().nullable(),
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
})

export const doulaPackageDetailSchema = z.object({
    id: z.string(),
    doulaId: z.string(),
    name: z.string(),
    price: z.string(),
    description: z.string(),
    shortDescription: z.string(),
    image: z.string().nullable(),
    qualifications: z.number(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
    cares: z.array(caresListItemSchema),
    doula: z.object({
    id: z.string(),
    user: z.object({
        fullName: z.string(),
        middleName: z.string(),
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    }).nullable(),
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

export const doulaPackageDetailResponseSchema  = z.object({
    message: z.string(),
    data: doulaPackageDetailSchema
})