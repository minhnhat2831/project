import * as z from "zod";

const required = "This field is required"

export type VoucherForm = z.infer<typeof VoucherScheme>;

export const VoucherScheme = z.object({
    code: z.string().min(1, required),
    description: z.string().min(1, required),
    startDate: z.string().min(1, required),
    endDate: z.string().min(1, required),
    quantityUse: z.coerce.number().int().min(1, "Quantity Use must be a integer number and greater than or equal to 1") as z.ZodNumber,
    amount: z.coerce.number().int().min(1, required) as z.ZodNumber,
    minPayAmount: z.coerce.number().int().min(1, required) as z.ZodNumber,
    maxDiscountAmount: z.coerce.number().int().min(1, required) as z.ZodNumber,
    type: z.string().min(1, required),
})
