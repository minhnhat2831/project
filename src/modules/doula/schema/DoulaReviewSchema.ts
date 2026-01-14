import * as z from "zod";

export type GetDoulaReviewParams = z.infer<typeof GetDoulaReviewParamsSchema>;
export const GetDoulaReviewParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    f_doulaId: z.string().nullable().optional(),
});

export type DoulaReview = z.infer<typeof DoulaReviewSchema>
export const DoulaReviewSchema = z.object({
    id: z.string(),
    doulaId: z.string().nullable(),
    userId:  z.string().nullable(),
    comment:  z.string().nullable(),
    start:  z.number().nullable(),
    expertiseStar: z.number().nullable(),
    communicationStar: z.number().nullable(),
    punctualityStar: z.number().nullable(),
    supportStar: z.number().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    user: z.object({
        fullName: z.string().nullable(),
        firstName: z.string().nullable(),
        middleName: z.string().nullable(),
        lastName: z.string().nullable(),
        picture: z.string().nullable()
    })
})

export type DoulaReviewBaseForm = z.infer<typeof DoulaReviewBaseFormSchema>
export const DoulaReviewBaseFormSchema = z.object({
    message: z.string(),
    data: z.array(DoulaReviewSchema),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export type GetDoulaOverReviewParams = z.infer<typeof GetDoulaOverReviewParamsSchema>;
export const GetDoulaOverReviewParamsSchema = z.object({
    doulaId : z.string().nullable()
});

export type DoulaOverReview= z.infer<typeof DoulaOverReviewSchema>;
export const DoulaOverReviewSchema = z.object({
    id:  z.string().nullable(),
    title:  z.string().nullable(),
    description:  z.string().nullable(),
    businessName:  z.string().nullable(),
    starAvg:  z.number().nullable(),
    status: z.enum(["active", "inactive"]),
    qualifications: z.string().array(),
    stripeCustomerId: z.string().nullable(),
    isTrialed: z.boolean(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    avgStart: z.string().nullable(),
    avgExpertiseStar: z.string().nullable(),
    avgCommunicationStar: z.string().nullable(),
    avgPunctualityStar: z.string().nullable(),
    avgSupportStar: z.string().nullable(),
    totalReview: z.number().nullable(),
})

export type DoulaOverReviewResponse = z.infer<typeof GetDoulaOverReviewResponseSchema>;
export const GetDoulaOverReviewResponseSchema = z.object({
    message : z.string(),
    data : DoulaOverReviewSchema
});