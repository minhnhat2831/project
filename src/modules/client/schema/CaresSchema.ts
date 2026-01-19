import * as z from "zod"

export const caresParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_userId: z.string().optional(),
    f_doulaId: z.string().optional(),
    f_status: z.string().optional(),
});

export const caresListItemSchema = z.object({
    id: z.string(),
    doulaId: z.string(),
    userId: z.string(),
    title: z.string(),
    doulaPackageId: z.string(),
    status: z.enum(["active", "inactive"]),
    startDate: z.string(),
    createdAt: z.string(),
    updatedAt: z.string().optional(),
    deletedAt: z.string().optional(),
    endDate: z.string().optional(),
    user: z.object({
        fullName: z.string(),
        middleName: z.string(),
        picture: z.string(),
        firstName: z.string(),
        lastName: z.string(),
    }).nullable(),
    doula: z.object({
        title: z.string(),
        user: z.object({
            fullName: z.string(),
            middleName: z.string(),
            picture: z.string(),
            firstName: z.string(),
            lastName: z.string(),
        }).nullable(),
    }).nullable(),
    doulaPackage: z.object({
        name: z.string(),
    }).nullable(),
});

export const caresListSchema = z.object({
    message: z.string(),
    data: z.array(caresListItemSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})


export const caresResponseSchema = z.object({
    message: z.string(),
    data: caresListItemSchema
})