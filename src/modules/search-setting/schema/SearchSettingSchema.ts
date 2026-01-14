import * as z from "zod";

const required = "This field is required"

export type SearchSettingRequest = z.infer<typeof SearchSettingRequestScheme>;
export const SearchSettingRequestScheme = z.object({
    keyword: z.string().min(1, required),
})

export type SearchSettingParams = z.infer<typeof SearchSettingParamsScheme>;
export const SearchSettingParamsScheme = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
})

export type SearchSetting = z.infer<typeof SearchSettingScheme>;
export const SearchSettingScheme = z.object({
    id: z.string(),
    keyword: z.string(),
    count: z.number(),
    isSuggestion: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string().nullable()
})

export type SearchSettingBaseForm = z.infer<typeof SearchSettingBaseFormScheme>;
export const SearchSettingBaseFormScheme = z.object({
    message: z.string(),
    data: z.array(SearchSettingScheme),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export type SearchSettingResponse = z.infer<typeof SearchSettingResponseScheme>;
export const SearchSettingResponseScheme = z.object({
    message : z.string(),
    data : z.boolean()
})