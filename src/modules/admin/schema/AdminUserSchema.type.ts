import * as z from "zod";
import type { 
    adminListItemSchema,
    createAdminUserSchema,
    editAdminUserSchema,
    adminListSchema,
    adminResponseSchema,
    adminDetailResponseSchema,
    adminsParamsSchema
} from "./AdminUserSchema";

export type adminListItem = z.infer<typeof adminListItemSchema>;
export type adminFormCreate = z.infer<typeof createAdminUserSchema>;
export type adminFormEdit = z.infer<typeof editAdminUserSchema>;
export type adminList = z.infer<typeof adminListSchema>;
export type adminUserResponse = z.infer<typeof adminResponseSchema>;
export type adminDetailResponse = z.infer<typeof adminDetailResponseSchema>;
export type adminsParams = z.infer<typeof adminsParamsSchema>;