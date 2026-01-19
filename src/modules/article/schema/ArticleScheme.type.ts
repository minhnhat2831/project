import * as z from "zod";
import type { 
    articleDeleteResponseSchema, 
    articleDeleteSchema, 
    articleListItemSchema, 
    articleListSchema, 
    articleRequestScheme, 
    articleResponseSchema, 
    articleParamsSchema 
} from "./ArticleScheme";

export type articleRequest = z.infer<typeof articleRequestScheme>;

export type articleParams = z.infer<typeof articleParamsSchema>;

export type articleListItem = z.infer<typeof articleListItemSchema>;

export type articleList = z.infer<typeof articleListSchema>

export type articleResponse = z.infer<typeof articleResponseSchema>

export type articleDeleteResponse = z.infer<typeof articleDeleteResponseSchema>

export type articleDelete = z.infer<typeof articleDeleteSchema>