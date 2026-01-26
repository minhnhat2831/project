import * as z from "zod"

const required = "This field is required"

export const bankAccountListSchema = z.object({
    bankAccountUid: z.string(),
    currency: z.string(),
    beneficiaryName: z.string(),
    beneficiaryBankName: z.string(),
    beneficiaryBankAccountNumber: z.string(),
    beneficiaryBankSwift: z.string(),
    correspondentBankName: z.string(),
    correspondentBankSwift : z.string(),
    displayName: z.string()
})

export const currencyListSchema = z.string().array()

export const isinsListSchema = z.object({
    isin: z.string(),
    securityName: z.string(),
    currency: z.string(),
})

export const isinHoldingListSchema = z.object({
    ISIN: z.object({
        organizationName: z.string(),
        subOrganizationName: z.string(),
        effectiveValueAmt: z.number(),
    })
})

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

export const cashTransactionPayLoadSchema = z.object({
    orgNum: z.string().min(1, required).nullable(),
    subOrgNum: z.string().min(1, required).nullable(),
    transactionType: z.string().min(1, required).nullable(),
    currency: z.string().min(1, required).nullable(),
    amount: z.number().min(1, required).nullable(),
    effectiveDo: z.string().min(1, required).nullable(),
    description: z.string().min(1, required).nullable(),
    feesAmt: z.number().nullable(),
    gstAmt: z.number().nullable(),
    bankChargesAmt: z.number().nullable(),
    bankAccountUid: z.string().nullable(),
    createdDo: z.string().min(1, required).nullable(),
    comments: z.string().nullable(),
    files: z.string().array().nullable(),
    couponPayments: z.object({
        clientName: z.string().nullable(),
        organizationNum: z.string().nullable(),
        subOrganizationNum: z.string().nullable(),
        subAccountNum: z.string().nullable(),
        cashOrderAmt: z.number().nullable(),
        currency: z.string().nullable(),
        bankAccountTo: z.string().nullable()
    }).nullable(),
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
    transactionType: z.string().nullable(),
    currency: z.string().min(1, required).nullable(),
    amount: z.number().min(1, required).nullable(),
    effectiveDo: z.string().min(1, required).nullable(),
    description: z.string().min(1, required).nullable(),
    feesAmt: z.number().nullable(),
    gstAmt: z.number().nullable(),
    bankChargesAmt: z.number().nullable(),
    bankAccountUid: bankAccountListSchema,
    createdDo: z.string().min(1, required).nullable(),
    comments: z.string().nullable(),
    files: z.string().array().nullable(),
    couponPayments: z.object({
        clientName: z.string().nullable(),
        organizationNum: z.string().nullable(),
        subOrganizationNum: z.string().nullable(),
        subAccountNum: z.string().nullable(),
        cashOrderAmt: z.number().nullable(),
        currency: z.string().nullable(),
        bankAccountTo: z.string().nullable()
    }).nullable(),
    totalCouponAmount: z.number().nullable(),
    isin: z.string().nullable(),
    couponPercentageRate: z.number().nullable(),
    paymentDo: z.string().nullable()
})

export const cashTransactionFormListSchema = z.object({
    action: z.string(),
    data: cashTransactionFormSchema
})
