import * as z from "zod"

const required = "This field is required"

export type HelpDocumentForm = z.infer<typeof HelpDocumentSchema>;

export const HelpDocumentSchema = z.object(
{
    title: z.string().min(1, required),
    content: z.string().min(1, required),
    status: z.string().min(1, required),
})

