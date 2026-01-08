import * as z from "zod";

const required = "This field is required"

export type ArticleForm = z.infer<typeof ArticleScheme>;

export const ArticleScheme = z.object({
    title : z.string().min(1, required),
    content : z.string().min(1, required),
    status : z.string().min(1, required),
    picture: z.string().nullable().optional(),
    timeToRead: z.coerce.number().min(1, required),
    categoryId  : z.string().min(1, required),
    author : z.string().min(1, required),
})
