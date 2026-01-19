import * as z from "zod";

const required = "This field is required"

export const pdRequestScheme = z.object({
    title: z.string().min(1, required),
    content: z.string().min(1, required),
    status: z.string().min(1, required),
    picture: z.string().optional(),
    timeToRead: z.coerce.number().min(0, required) as z.ZodNumber,
    categoryId: z.string().min(1, required),
    author: z.string().min(1, required),
})

export const pdParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_type: z.string().optional(),
    f_categoryId: z.string().optional(),
    f_status: z.string().optional(),
});

export const pdListItemSchema = z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    picture: z.object({
        id: z.string(),
        uri: z.string().nullable(),
        type: z.string(),
        metadata: z.object({
            thumbnail: z.object({
                uri: z.string(),
                key: z.string(),
            }),
            medium: z.object({
                uri: z.string(),
                key: z.string(),
            })
        }).nullable(),
        createdAt: z.string(),
    }).optional(),
    content: z.string(),
    status: z.enum(["published", "unpublished", "draft"]),
    type: z.string(),
    author: z.string(),
    categoryId: z.string(),
    timeToRead: z.number(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    category: z.object({
        id: z.string(),
        name: z.string(),
    })
})

export const pdListSchema = z.object({
    message: z.string(),
    data: z.array(pdListItemSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export const PdResponseSchema = z.object({
    message : z.string(),
    data : pdListItemSchema
})

export const pdDeleteResponseSchema = z.object({
    message : z.string(),
    data : z.string()
})

export const pdDeleteSchema = z.object({
    ids : z.string().array()
})