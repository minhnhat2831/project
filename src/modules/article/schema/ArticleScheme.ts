import * as z from "zod";

const required = "This field is required"

export type ArticleRequest = z.infer<typeof ArticleRequestScheme>;
export const ArticleRequestScheme = z.object({
    title: z.string().min(1, required),
    content: z.string().min(1, required),
    status: z.string().min(1, required),
    picture: z.string().optional(),
    timeToRead: z.coerce.number().min(0, required) as z.ZodNumber,
    categoryId: z.string().min(1, required),
    author: z.string().min(1, required),
})

export type GetArticleParams = z.infer<typeof GetArticleParamsSchema>;
export const GetArticleParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_type: z.string().optional(),
    f_categoryId: z.string().optional(),
    f_status: z.string().optional(),
});

export type Article = z.infer<typeof ArticleSchema>;
export const ArticleSchema = z.object({
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

export type ArticleBaseForm = z.infer<typeof ArticleBaseFormSchema>
export const ArticleBaseFormSchema = z.object({
    message: z.string(),
    data: z.array(ArticleSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export type ArticleResponse = z.infer<typeof ArticleResponseSchema>
export const ArticleResponseSchema = z.object({
    message : z.string(),
    data : ArticleSchema
})

export type ArticleDeleteResponse = z.infer<typeof ArticleDeleteResponseSchema>
export const ArticleDeleteResponseSchema = z.object({
    message : z.string(),
    data : z.string()
})

export type ArticleDelete = z.infer<typeof ArticleDeleteSchema>
export const ArticleDeleteSchema = z.object({
    ids : z.string().array()
})