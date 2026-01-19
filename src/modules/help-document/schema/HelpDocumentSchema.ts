import * as z from "zod"

const required = "This field is required"

export const helpDocumentParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().optional(),
    sort: z.string().optional()
})

export const helpDocumentRequestSchema = z.object(
{
    title: z.string().min(1, required),
    content: z.string().min(1, required),
    status: z.string().min(1, required),
})

export const helpDocumentListItemSchema = z.object(
{
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
    title: z.string(),
    content: z.string(),
    status: z.enum(["active", "inactive"]),
})

export const helpDocumentListSchema = z.object(
{
    message: z.string(),
    data: z.array(helpDocumentListItemSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export const helpDocumentResponseSchema = z.object(
{
    message : z.string(),
    data : helpDocumentListItemSchema
})

export const deleteHelpDocumentResponseSchema = z.object(
{
    message : z.string(),
    data : z.boolean()
})