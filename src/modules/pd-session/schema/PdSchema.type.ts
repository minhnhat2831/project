import * as z from "zod";
import type { pdDeleteResponseSchema, pdDeleteSchema, pdListItemSchema, pdListSchema, pdParamsSchema, pdRequestScheme, PdResponseSchema } from "./PdSchema";

export type pdRequest = z.infer<typeof pdRequestScheme>;
export type pdParams = z.infer<typeof pdParamsSchema>;
export type pdListItem = z.infer<typeof pdListItemSchema>;
export type pdList = z.infer<typeof pdListSchema>
export type pdResponse = z.infer<typeof PdResponseSchema>
export type pdDeleteResponse = z.infer<typeof pdDeleteResponseSchema>
export type pdDelete = z.infer<typeof pdDeleteSchema>
