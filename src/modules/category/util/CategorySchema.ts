import * as z from "zod"

const required = "This field is required"

export type CategoryForm = z.infer<typeof CategorySchema>;

export const CategorySchema = z.object({
    title: z.string().min(1, required),
    name: z.string().min(1, required),
    status: z.string().min(1, required), 
    image: z.string().nullable().optional(),
})