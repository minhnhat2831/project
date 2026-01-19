import * as z from "zod";

//Admin
export const adminListItemSchema = z.object({
  id: z.string(),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: z.string(),
  status: z.enum(["active", "inactive"]),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
})

export const createAdminUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  email: z.email().min(1, 'Email is required'),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  status: z.string().min(1, 'Status is required'),
})

export const editAdminUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string(),
  email: z.email().min(1, 'Email is required'),
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  status: z.string().min(1, { message: 'Status is required' }),
}).superRefine((data, ctx) => {
  if (data.password && data.password.length > 0 && data.password.length < 8) {
    ctx.addIssue({
      path: ["password"],
      message: "Password must be at least 8 characters long",
      code: z.ZodIssueCode.custom,
    });
  }
});

export const adminListSchema = z.object({
  message: z.string(),
  data: z.array(adminListItemSchema),
  metadata: z.object({
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    totalCount: z.number(),
    hasNextPage: z.boolean()
  })
})

export const adminResponseSchema = z.object({
  message: z.string(),
  data: z.boolean()
})


export const adminDetailResponseSchema = z.object({
  message: z.string(),
  data: adminListItemSchema
})

export const adminsParamsSchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  search: z.string().nullable().optional(),
  sort: z.string().optional(),
  f_username: z.string().optional(),
  f_email: z.string().optional(),
});