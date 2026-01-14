import * as z from "zod"

const required = "This field is required"

export type HelpDocumentParams = z.infer<typeof HelpDocumentParamsSchema>
export const HelpDocumentParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().optional(),
    sort: z.string().optional()
})

export type HelpDocumentRequest = z.infer<typeof HelpDocumentRequestSchema>;
export const HelpDocumentRequestSchema = z.object(
{
    title: z.string().min(1, required),
    content: z.string().min(1, required),
    status: z.string().min(1, required),
})

export type HelpDocument = z.infer<typeof HelpDocumentSchema>;
export const HelpDocumentSchema = z.object(
{
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
    title: z.string(),
    content: z.string(),
    status: z.enum(["active", "inactive"]),
})

export type HelpDocumentBaseForm = z.infer<typeof HelpDocumentBaseFormSchema>;
export const HelpDocumentBaseFormSchema = z.object(
{
    message: z.string(),
    data: z.array(HelpDocumentSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export type HelpDocumentResponse= z.infer<typeof HelpDocumentResponseSchema>;
export const HelpDocumentResponseSchema = z.object(
{
    message : z.string(),
    data : HelpDocumentSchema
})

export type DeleteHelpDocumentResponse= z.infer<typeof DeleteHelpDocumentResponseSchema>;
export const DeleteHelpDocumentResponseSchema = z.object(
{
    message : z.string(),
    data : z.boolean()
})