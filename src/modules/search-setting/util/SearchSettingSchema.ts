import * as z from "zod";

const required = "This field is required"

export type SearchSettingForm = z.infer<typeof SearchSettingScheme>;

export const SearchSettingScheme = z.object({
    keyword: z.string().min(1, required),
})
