import * as z from "zod";

export const AdminUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  role: "admin",
  status: z.string(),
  picture: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type AdminFormCreate = z.infer<typeof CreateAdminUserSchema>;
export const CreateAdminUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  email: z.email().min(1, 'Email is required'),
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  status: z.string().min(1, 'Status is required'),
})

export type AdminFormEdit = z.infer<typeof EditAdminUserSchema>;
export const EditAdminUserSchema = z.object({
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