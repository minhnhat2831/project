import * as z from "zod";

const required = "This field is required"

export const searchSettingRequestScheme = z.object({
    keyword: z.string().min(1, required),
})

export const searchSettingParamsScheme = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
})

export const searchSettingListItemScheme = z.object({
    id: z.string(),
    keyword: z.string(),
    count: z.number(),
    isSuggestion: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string().nullable()
})

export const searchSettingListScheme = z.object({
    message: z.string(),
    data: z.array(searchSettingListItemScheme),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export const searchSettingResponseScheme = z.object({
    message : z.string(),
    data : z.boolean()
})