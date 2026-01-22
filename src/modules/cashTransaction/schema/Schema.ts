import * as z from "zod"

const required = "this field is required"

export const bankAccountListSchema = z.object({
    bankAccountUid: z.string(),
    currency: z.string(),
    beneficiaryName: z.string(),
    beneficiaryBankName: z.string(),
    beneficiaryBankAccountNumber: z.string(),
    beneficiaryBankSwift: z.string(),
    correspondentBankName: z.string(),
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

export const cashTransactionFormSchema = z.object({
    orgNum: z.string().nullable(),
    subOrgNum: z.string().nullable(),
    transactionType: z.string().nullable(),
    currency: z.string().nullable(),
    amount: z.string().nullable(),
    effectiveDo: z.string().nullable(),
    description: z.string().nullable(),
    feesAmt: z.string().nullable().nullable(),
    gstAmt: z.string().nullable().nullable(),
    bankChargesAmt: z.string().nullable(),
    bankAccountUid: z.string().nullable(),
    createdDo: z.string().nullable(),
    comments: z.string().nullable(),
    files: z.string().array(),
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

//Bỏ 2 cái request sài cashTransactionFormSchema
export const cashTransactionRequestSchema = z.object({
    orgNum: z.string().min(1, required),
    subOrgNum: z.string().min(1, required),
    transactionType: z.string().min(1, required),
    currency: z.string().min(1, required),
    amount: z.number().min(1, required),
    effectiveDo: z.string().min(1, required),
    description: z.string().min(1, required),
    bankAccountUid: z.string().min(1, required),
    createdDo: z.string().min(1, required),
    comments: z.string().nullable(),
    files: z.string().array().optional()
})

export const cashTransactionWithdrawalRequestSchema = z.object({
    orgNum: z.string(),
    subOrgNum: z.string(),
    transactionType: z.string(),
    currency: z.string(),
    amount: z.number(),
    effectiveDo: z.string(),
    feesAmt: z.string(),
    gstAmt: z.string(),
    bankChargesAmt: z.string(),
    description: z.string(),
    bankAccountUid: z.string(),
    createdDo: z.string(),
    comments: z.string(),
    files: z.string().array(),
})
///

export const cashTransactionListSchema = z.object({
    action: z.string(),
    data: cashTransactionFormSchema
})
