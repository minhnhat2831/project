import * as z from "zod"

const required = "This field is required"

export type DoulaForm = z.infer<typeof DoulaSchema>;

const UserSchema = z.object({
    countryCode: z.string().nullable().optional(),
    phoneNumber: z.string().min(8, "Phone number must be from 8 to 20 characters.")
})

export const DoulaSchema = z.object(
{
    user: UserSchema,
    status: z.string().min(1, required),
})

