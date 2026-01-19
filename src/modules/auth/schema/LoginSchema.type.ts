import * as z from "zod";
import type { loginRequestSchema, loginResponseSchema } from "./LoginSchema";

export type loginRequest = z.infer<typeof loginRequestSchema>;
export type loginResponse = z.infer<typeof loginResponseSchema>