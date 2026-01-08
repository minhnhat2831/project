import * as z from "zod"

const required = "This field is required"

export type ClientForm = z.infer<typeof ClientSchema>;

export const ClientSchema = z.object({
    countryCode : z.string().nullable().optional(),
    phoneNumber: z.coerce.number().min(8, "Phone number must be from 8 to 20 characters.").max(12, "Phone number must be from 8 to 20 characters."),
    status: z.string().min(1, required), 
})