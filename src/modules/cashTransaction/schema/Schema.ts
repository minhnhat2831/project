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
    clientName: z.string().optional(),
    subOrganizationName: z.string().optional(),
    effectiveValueAmt: z.number().optional(),
    organizationNum: z.string().optional(),
    subOrganizationNum: z.string().optional(),
    subAccountNum: z.string().optional()
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
    bankAccountTo: z.string().nullable(),
}).nullable().optional()

export const cashTransactionDebitPayLoadSchema = z.object({
    orgNum: z.string().nullable().optional(),
    subOrgNum: z.string().nullable().optional(),
    transactionType: z.string().nullable().optional(),
    currency: z.string().nullable().optional(),                  //
    amount: z.number().nullable().optional(),
    effectiveDo: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    feesAmt: z.number().nullable().optional(),
    gstAmt: z.number().nullable().optional(),
    bankChargesAmt: z.number().nullable().optional(),
    bankAccountUid: z.string().nullable().optional(),
    createdDo: z.string().min(1, required).nullable().optional(),
    comments: z.string().nullable().optional(),
    files: z.array(z.instanceof(File)).optional(),
})

export const cashTransactionDebitPayLoadListSchema = z.object({
    action: z.string(),
    data: cashTransactionDebitPayLoadSchema
})

export const cashTransactionCouponPayLoadSchema = z.object({
    transactionType: z.string().nullable().optional(),
    currency: z.string().nullable().optional(),                  //
    description: z.string().nullable().optional(),
    feesAmt: z.number().nullable().optional(),
    gstAmt: z.number().nullable().optional(),
    comments: z.string().nullable().optional(),
    files: z.array(z.instanceof(File)).optional(),
    couponPayments: z.array(couponPaymentsSchema),
    totalCouponAmount: z.number().nullable().optional(),
    isin: z.string().nullable().optional(),
    couponPercentageRate: z.number().nullable().optional(),
    paymentDo: z.string().nullable().optional()
})

export const cashTransactionCouponPayLoadListSchema = z.object({
    action: z.string(),
    data: cashTransactionCouponPayLoadSchema
})

export const cashTransactionFormSchema = z.object({
    orgNum: orgsSchema,
    subOrgNum: subOrgSchema,
    transactionType: z.string().min(1, required).nullable().optional(),
    currency: z.string().nullable().optional(),
    amount: z.number().nullable().optional(),
    effectiveDo: z.string().nullable().optional(),
    description: z.string().min(1, required).nullable().optional(),
    feesAmt: z.number().nullable().optional(),
    gstAmt: z.number().nullable().optional(),
    bankChargesAmt: z.number().nullable().optional(),
    bankAccountUid: bankAccountListSchema,
    createdDo: z.string().nullable().optional(),
    comments: z.string().nullable().optional(),
    files: z.array(z.instanceof(File)).optional(),
    couponPayments: z.array(z.object({
        clientName: z.string().nullable(),
        organizationNum: z.string().nullable(),
        subOrganizationNum: z.string().nullable(),
        subAccountNum: z.string().nullable(),
        cashOrderAmt: z.number().nullable(),
        bankAccountTo: z.string().nullable(),
    })),
    totalCouponAmount: z.number().nullable().optional(),
    isin: z.string().nullable().optional(),
    couponPercentageRate: z.number().nullable().optional(),
    paymentDo: z.string().nullable().optional()
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
        if (!data.paymentDo) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: required,
                path: ["paymentDo"]
            })
        }
        data.couponPayments?.forEach((item, index) => {
            if (!item.bankAccountTo) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: required,
                    path: ["couponPayments", index, "bankAccountTo"]
                })
            }
        })
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
