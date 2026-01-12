import * as z from "zod";

const required = "This field is required"

export type PdForm = z.infer<typeof PdScheme>;

export const PdScheme = z.object({
    title : z.string().min(1, required),
    content : z.string().min(1, required),
    status : z.string().min(1, required),
    picture: z.string().optional(),
    timeToRead: z.coerce.number().min(1, required) as z.ZodNumber,
    categoryId  : z.string().min(1, required),
    author : z.string().min(1, required),
})
