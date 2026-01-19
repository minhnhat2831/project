import * as z from "zod"

const required = "This field is required"

export const categoryParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_name: z.string().optional(),
    f_status: z.string().optional()
});

export const categoryRequestSchemas = z.object({
    title: z.string().min(1, required),
    name: z.string().min(1, required),
    status: z.string().min(1, required),
    image: z.string().min(1, required),
})

export const categoryListItemSchema = z.object({
    id: z.string(),
    name: z.string(),
    title: z.string(),
    picture: z.object({
        id: z.string(),
        uri: z.string().nullable().optional(),
        type: z.string().optional(),
        metadata: z.object({
            thumbnail: z.object({
                uri: z.string(),
                key: z.string(),
            }),
            medium: z.object({
                uri: z.string(),
                key: z.string(),
            })
        }).optional(),
        createdAt: z.string()
    }),
    status: z.enum(['active', 'inactive']),
    slug: z.string(),
    createdAt: z.string(),
    updatedAt: z.string().nullable()
})

export const categoryListSchema = z.object({
    message: z.string(),
    data: z.array(categoryListItemSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export const categoryResponseSchema = z.object({
    message: z.string(),
    data: categoryListItemSchema
})


export const categoryDeleteResponseSchema = z.object({
    message: z.string(),
    data: z.string()
})

export const categoryDeleteSchema = z.object({
    ids: z.string().array()
})