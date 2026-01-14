import z from "zod";

const price = z.object({
    name: z.string(),
    amount: z.number(),
    count: z.number(),
    interval: z.string(),
    description: z.string()
})

export type DoulaSubcription = z.infer<typeof DoulaSubcriptionSchema>
export const DoulaSubcriptionSchema = z.object({
    id: z.string(),
    subscriptionPlanName: z.string(),
    endTime: z.string().nullable(),
    status: z.enum(["active", "cancelled"]),
    createdAt: z.string(),
    subscription: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.array(price)
    }),
    price: z.object({
        name: z.string(),
        amount: z.number(),
        count: z.number(),
        interval: z.string(),
        description: z.string()
    }),
    nextBillingDate: z.string().nullable()
})

export type DoulaSubcriptionBaseForm = z.infer<typeof DoulaSubcriptionBaseFormSchema>
export const DoulaSubcriptionBaseFormSchema = z.object({
    message : z.string(),
    data : DoulaSubcriptionSchema
})