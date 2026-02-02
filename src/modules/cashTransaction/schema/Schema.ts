import * as z from "zod"
import { TRANSACTION_CREDIT_ENUM } from "../constants/TransactionType"

const required = "This field is required"

export const bankAccountListSchema = z.object({
    bankAccountUid: z.string(),
    currency: z.string(),
    beneficiaryName: z.string(),
    beneficiaryBankName: z.string(),
    beneficiaryBankAccountNumber: z.string(),
    beneficiaryBankSwift: z.string(),
    correspondentBankName: z.string(),
    correspondentBankSwift: z.string(),
    displayName: z.string()
})

export const currencyListSchema = z.string().array()

export const isinsListSchema = z.object({
    isin: z.string(),
    securityName: z.string(),
    currency: z.string(),
})

export const isinHoldingListSchema = z.object({
    organizationName: z.string(),
    subOrganizationName: z.string(),
    effectiveValueAmt: z.number(),
})

export const isinHoldingListItemSchema = z.array(isinHoldingListSchema)

export const orgsSchema = z.object({
    id: z.string(),
    name: z.string(),
    shortName: z.string(),
    countryCode: z.string(),
})

export const orgsListSchema = z.array(orgsSchema)

export const subOrgSchema = z.object({
    name: z.string(),
    orgId: z.string(),
    subOrgId: z.string(),
    description: z.string(),
})

export const subOrgsListSchema = z.record(
    z.string(),
    z.array(subOrgSchema)
)

export const couponPaymentsSchema = z.object({
    clientName: z.string().nullable(),
    organizationNum: z.string().nullable(),
    subOrganizationNum: z.string().nullable(),
    subAccountNum: z.string().nullable(),
    cashOrderAmt: z.number().nullable(),
    currency: z.string().nullable(),
    bankAccountTo: z.string().nullable(),
}).nullable()

export const cashTransactionPayLoadSchema = z.object({
    orgNum: z.string().nullable(),
    subOrgNum: z.string().nullable(),
    transactionType: z.string().nullable(),
    currency: z.string().nullable(),                  //
    amount: z.number().nullable(),
    effectiveDo: z.string().nullable(),
    description: z.string().nullable(),
    feesAmt: z.number().nullable(),
    gstAmt: z.number().nullable(),
    bankChargesAmt: z.number().nullable(),
    bankAccountUid: z.string().nullable(),
    createdDo: z.string().min(1, required).nullable(),
    comments: z.string().nullable(),
    files: z.array(z.instanceof(File)).optional(),
    couponPayments: z.array(couponPaymentsSchema),
    totalCouponAmount: z.number().nullable(),
    isin: z.string().nullable(),
    couponPercentageRate: z.number().nullable(),
    paymentDo: z.string().nullable()
})

export const cashTransactionPayLoadListSchema = z.object({
    action: z.string(),
    data: cashTransactionPayLoadSchema
})

export const cashTransactionFormSchema = z.object({
    orgNum: orgsSchema,
    subOrgNum: subOrgSchema,
    transactionType: z.string().min(1, required).nullable(),
    currency: z.string().nullable(),
    amount: z.number().nullable(),
    effectiveDo: z.string().nullable(),
    description: z.string().min(1, required).nullable(),
    feesAmt: z.number().nullable(),
    gstAmt: z.number().nullable(),
    bankChargesAmt: z.number().nullable(),
    bankAccountUid: bankAccountListSchema,
    createdDo: z.string().nullable(),
    comments: z.string().nullable(),
    files: z.array(z.instanceof(File)).optional(),
    couponPayments: z.array(z.object({
        clientName: z.string().nullable(),
        organizationNum: z.string().nullable(),
        subOrganizationNum: z.string().nullable(),
        subAccountNum: z.string().nullable(),
        cashOrderAmt: z.number().nullable(),
        currency: z.string().nullable(),
        bankAccountTo: z.string().nullable(),
        netPaymentAmount: z.number().optional()
    })),
    totalCouponAmount: z.number().nullable(),
    isin: z.string().nullable(),
    couponPercentageRate: z.number().nullable(),
    paymentDo: z.string().nullable()
}).superRefine((data, ctx) => {
    const isCoupon = data.transactionType === TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT

    if (isCoupon) {
        if (!data.isin) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: required,
                path: ["isin"]
            })
        }
        if (!data.totalCouponAmount) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: required,
                path: ["totalCouponAmount"]
            })
        }
        if (!data.paymentDo) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: required,
                path: ["paymentDo"]
            })
        }
        if (!data.couponPercentageRate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: required,
                path: ["couponPercentageRate"]
            })
        }
    } else {
        if (!data.currency) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: required,
                path: ["currency"]
            })
        }
        if (!data.amount) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: required,
                path: ["amount"]
            })
        }
        if (!data.effectiveDo) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: required,
                path: ["effectiveDo"]
            })
        }
    }
})

export const cashTransactionFormListSchema = z.object({
    action: z.string(),
    data: cashTransactionFormSchema
})
