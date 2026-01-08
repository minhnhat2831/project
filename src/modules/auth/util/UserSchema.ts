import * as z from "zod";

export type LoginForm = z.infer<typeof LoginSchema>;
export const LoginSchema = z.object({
    username : z.string().min(1, "This filed is required"),
    password : z.string().min(1, "This filed is required")
})
