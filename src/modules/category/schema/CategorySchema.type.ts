import * as z from "zod"
import type { 
    categoryDeleteResponseSchema, 
    categoryDeleteSchema, 
    categoryListItemSchema, 
    categoryListSchema, 
    categoryRequestSchemas, 
    categoryResponseSchema,
    categoryParamsSchema 
} from "./CategorySchema";

export type categoryParams = z.infer<typeof categoryParamsSchema>;

export type categoryRequest = z.infer<typeof categoryRequestSchemas>;

export type categoryListItem = z.infer<typeof categoryListItemSchema>

export type categoryList = z.infer<typeof categoryListSchema>

export type categoryResponse = z.infer<typeof categoryResponseSchema>

export type categoryDeleteResponse = z.infer<typeof categoryDeleteResponseSchema>

export type categoryDelete = z.infer<typeof categoryDeleteSchema>