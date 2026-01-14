import * as z from "zod";

const required = "This field is required"

export type PdRequest = z.infer<typeof PdRequestScheme>;
export const PdRequestScheme = z.object({
    title: z.string().min(1, required),
    content: z.string().min(1, required),
    status: z.string().min(1, required),
    picture: z.string().optional(),
    timeToRead: z.coerce.number().min(0, required) as z.ZodNumber,
    categoryId: z.string().min(1, required),
    author: z.string().min(1, required),
})

export type GetPdParams = z.infer<typeof GetPdParamsSchema>;
export const GetPdParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_type: z.string().optional(),
    f_categoryId: z.string().optional(),
    f_status: z.string().optional(),
});

export type Pd = z.infer<typeof PdSchema>;
export const PdSchema = z.object({
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

export type PdBaseForm = z.infer<typeof PdBaseFormSchema>
export const PdBaseFormSchema = z.object({
    message: z.string(),
    data: z.array(PdSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export type PdResponse = z.infer<typeof PdResponseSchema>
export const PdResponseSchema = z.object({
    message : z.string(),
    data : PdSchema
})

export type PdDeleteResponse = z.infer<typeof PdDeleteResponseSchema>
export const PdDeleteResponseSchema = z.object({
    message : z.string(),
    data : z.string()
})

export type PdDelete = z.infer<typeof PdDeleteSchema>
export const PdDeleteSchema = z.object({
    ids : z.string().array()
})