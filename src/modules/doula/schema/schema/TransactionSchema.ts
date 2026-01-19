import * as z from "zod";

export const transactionParamsSchema = z.object({
    search: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    f_doulaId: z.string().nullable().optional(),
});

export const transactionListItemSchema = z.object({
    id: z.string(),
    stripeInvoiceId: z.string().nullable(),
    stripeSubscriptionId:  z.string().nullable(),
    stripeCustomerId:  z.string().nullable(),
    amount:  z.number().nullable(),
    last4: z.number().nullable(),
    totalAmount: z.number().nullable(),
    type: z.string().nullable(),
    brand: z.string().nullable(),
    status: z.enum(["active", "failed"]),
    discount: z.number().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
})

export const transactionListSchema = z.object({
    message: z.string(),
    data: z.array(transactionListItemSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export const transactionDetailSchema = z.object({
    id: z.string(),
    stripeInvoiceId: z.string().nullable(),
    doulaId:  z.string().nullable(),
    doulaSubscriptionId:  z.string().nullable(),
    amount:  z.number().nullable(),
    last4: z.number().nullable(),
    totalAmount: z.number().nullable(),
    type: z.string().nullable(),
    brand: z.string().nullable(),
    status: z.enum(["active", "failed"]),
    discount: z.number().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    deletedAt: z.string().nullable(),
    doulaSubscription: z.object({
        id: z.string().nullable(),
        subscriptionPlanName: z.string().nullable(),
        status: z.enum(["active", "inactive"]),
        subscription: z.object({
            id: z.string().nullable(),
            name: z.string().nullable()
        })
    })
})

export const transactionDetailListSchema = z.object({
    message: z.string(),
    data: z.array(transactionDetailSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})