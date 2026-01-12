import * as z from "zod"

const required = "This field is required"

export type ClientForm = z.infer<typeof ClientSchema>;

export const ClientSchema = z.object({
    countryCode : z.string().nullable(),
    phoneNumber: z.coerce.number().min(8, "Phone number must be from 8 to 20 characters.") as z.ZodNumber, 
    status: z.string().min(1, required), 
})