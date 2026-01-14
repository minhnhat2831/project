import * as z from "zod";

const required = "This field is required"

export type GetVoucherParams = z.infer<typeof GetVoucherParamsSchema>;
export const GetVoucherParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_code: z.string().optional(),
    f_type: z.string().optional(),
    f_status: z.string().optional(),
});

export type VoucherRequest = z.infer<typeof VoucherRequestScheme>;
export const VoucherRequestScheme = z.object({
    code: z.string().min(1, required),
    description: z.string().min(1, required),
    startDate: z.string().min(1, required),
    endDate: z.string().min(1, required),
    status: z.enum(["active", "inactive"]),
    quantityUse: z.coerce.number().int().min(1, "Quantity Use must be a integer number and greater than or equal to 1") as z.ZodNumber,
    amount: z.coerce.number().int().min(1, required) as z.ZodNumber,
    minPayAmount: z.coerce.number().int().min(1, required) as z.ZodNumber,
    maxDiscountAmount: z.coerce.number().int().min(1, required) as z.ZodNumber,
    type: z.string().min(1, required),
})

export type Voucher = z.infer<typeof VoucherScheme>;
export const VoucherScheme = z.object({
    id: z.string(),
    code: z.string(),
    description: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    status: z.enum(["active", "inactive"]),
    type: z.enum(["percentage", "fixed"]),
    amount: z.number(),
    quantityUse: z.number(),
    minPayAmount: z.number(),
    maxDiscountAmount: z.number(),
    stripeCouponId: z.number().nullable(),
    createdBy: z.string(),
    updatedBy: z.string().nullable(),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    totalDoulas: z.number(),
    numOfUsed: z.number(),
})

export type VoucherBaseForm = z.infer<typeof VoucherBaseFormScheme>;
export const VoucherBaseFormScheme = z.object({
    message: z.string(),
    data: z.array(VoucherScheme),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})

export type VoucherResponse = z.infer<typeof VoucherResponseSchema>;
export const VoucherResponseSchema = z.object({
    message : z.string(),
    data : VoucherScheme
})

export type VoucherDeleteRequest = z.infer<typeof VoucherDeleteSchema>;
export const VoucherDeleteSchema = z.object({
    status: z.enum(["active", "inactive"]),
})

//=======================DoulaVoucher================================
export type GetVoucherDoulaParams = z.infer<typeof GetVoucherDoulaParamsSchema>;
export const GetVoucherDoulaParamsSchema = z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    offset: z.number().optional(),
    search: z.string().nullable().optional(),
    sort: z.string().optional(),
    f_doulaId: z.string().optional(),
    f_voucherId: z.string().optional(),
});

export type VoucherDoula = z.infer<typeof VoucherDoulaScheme>;
export const VoucherDoulaScheme = z.object({
    id: z.string(),
    doulaId: z.string(),
    voucherId: z.string(),
    status: z.enum(["success" , "canceled" , "applied"]),
    createdAt: z.string().nullable(),
    updatedAt: z.string().nullable(),
    doulaUser : z.object({
        fullName : z.string(),
        id : z.string(),
        firstName : z.string(),
        middleName : z.string().nullable(),
        lastName : z.string(),
        picture: z.object({
                id: z.string(),
                uri: z.string().nullable(),
                type: z.string(),
                metadata: z.object({
                    thumbnail: z.object({
                        uri: z.string(),
                        key: z.string(),
                    }),
                    medium: z.object({
                        uri: z.string(),
                        key: z.string(),
                    })
                }).nullable(),
                createdAt: z.string(),
            }).optional(),
    })
})

export type VoucherDoulaBaseForm = z.infer<typeof VoucherDoulaBaseFormScheme>;
export const VoucherDoulaBaseFormScheme = z.object({
    message: z.string(),
    data: z.array(VoucherDoulaScheme),
    metadata: z.object({
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
        totalCount: z.number(),
        hasNextPage: z.boolean()
    })
})