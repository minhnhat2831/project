import * as z from "zod"

const required = "This field is required"

export type GetCategoryParams = z.infer<typeof GetCategoryParamsSchema>;
export const GetCategoryParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_name: z.string().optional(),
    f_status: z.string().optional()
});

export type CategoryRequest = z.infer<typeof CategoryRequestSchemas>;
export const CategoryRequestSchemas = z.object({
    title: z.string().min(1, required),
    name: z.string().min(1, required),
    status: z.string().min(1, required),
    image: z.string().min(1, required),
})

export type Category = z.infer<typeof CategorySchema>
export const CategorySchema = z.object({
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

export type CategoryBaseForm = z.infer<typeof CategoryBaseFormSchema>
export const CategoryBaseFormSchema = z.object({
    message: z.string(),
    data: z.array(CategorySchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export type CategoryResponse = z.infer<typeof CategoryResponseSchema>
export const CategoryResponseSchema = z.object({
    message: z.string(),
    data: CategorySchema
})

export type CategoryDeleteResponse = z.infer<typeof CategoryDeleteResponseSchema>
export const CategoryDeleteResponseSchema = z.object({
    message: z.string(),
    data: z.string()
})

export type CategoryDelete = z.infer<typeof CategoryDeleteSchema>
export const CategoryDeleteSchema = z.object({
    ids: z.string().array()
})