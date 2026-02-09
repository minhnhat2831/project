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
    createdDo: z.string().nullable().optional(),
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
    bankChargesAmt: z.number().nullable().optional(),
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

export const couponPaymentSchema = z.object({
  paymentDate: z.string(),
  amount: z.number()
});

export const cashTransactionListSchema = z.object({
  id: z.number(),
  parentId: z.number().nullable(),

  transactionId: z.string(),
  parentTransactionId: z.string().nullable(),

  cashOrderNum: z.string().nullable(),
  couponOrderNum: z.string().nullable(),

  orderStatus: z.string(),
  orderStatusAlias: z.string(),

  orgNum: z.string(),
  orgName: z.string(),

  subOrgNum: z.string().nullable(),
  subOrgName: z.string().nullable(),

  bankAccountUid: z.string().nullable(),
  bankAccountName: z.string().nullable(),
  bankAccountNum: z.string().nullable(),

  transactionType: z.string(),
  transactionCategory: z.string(),

  createDo: z.string(),
  effectiveDo: z.string().nullable(),

  isin: z.string().nullable(),
  securityName: z.string().nullable(),

  currency: z.string(),
  amount : z.number(),

  description: z.string().nullable(),
  submitType: z.string(),
  referenceNum: z.string().nullable(),

  netAmt: z.number().nullable(),
  feesAmt: z.number().nullable(),
  gstAmt: z.number().nullable(),
  bankChargesAmt: z.number().nullable(),
  cashOrderAmt: z.number().nullable(),

  debit: z.number().nullable(),
  credit: z.number().nullable(),

  runningBal: z.number().nullable(),

  payDt: z.string().nullable(),

  couponPaymentRate: z.number().nullable(),
  valueOfSettledHolding: z.number().nullable(),

  postedTo: z.string().nullable(),

  productOrderableType: z.string().nullable(),
  orderTransactionId: z.string().nullable(),

  bankAccountTxId: z.string().nullable(),
  groupId: z.string().nullable(),

  files: z.array(z.any()).nullable(),
  comments: z.string().nullable(),

  couponPayments: z.array(couponPaymentSchema).nullable(),
  totalCouponAmount: z.number().nullable(),

  inBeneficiaryAccountName: z.string().nullable(),
  inBeneficiaryAccountNumber: z.string().nullable(),

  needToReplaceFloatToCma: z.boolean()
});

export const cashTransactionDetailSchema = z.object({
  transactionId: z.string(),
  cashOrderNum: z.string().nullable(),
  couponOrderNum: z.string().nullable(),
  amount : z.number(),
  orderStatus: z.string(),
  orderStatusAlias: z.string(),

  orgNum: z.string(),
  orgName: z.string(),
  subOrgNum: z.string(),
  subOrgName: z.string(),

  bankAccountUid: z.string(),
  bankAccountName: z.string(),
  bankAccountNum: z.string(),

  transactionType: z.string(),       
  transactionCategory: z.string(),     

  createDo: z.string(),                 
  effectiveDo: z.string().nullable(),

  isin: z.string().nullable(),
  currency: z.string(),

  description: z.string(),
  submitType: z.string(),

  netAmt: z.number(),
  feesAmt: z.number(),
  gstAmt: z.number(),
  bankChargesAmt: z.number(),

  debit: z.string().nullable(),
  credit: z.string().nullable(),

  files: z.any().nullable(),

  productOrderableType: z.string().nullable(),
  orderTransactionId: z.string().nullable(),
  bankAccountTxId: z.string().nullable(),
  groupId: z.string().nullable(),

  securityName: z.string().nullable(),
  payDt: z.string().nullable(),

  couponPaymentRate: z.string().nullable(),
  valueOfSettledHolding: z.string().nullable(),
  runningBal: z.string().nullable(),

  postedTo: z.string(),                 

  couponPayments: z.any().nullable(),
  totalCouponAmount: z.string().nullable(),

  parentTransactionId: z.string().nullable(),

  inBeneficiaryAccountName: z.string().nullable(),
  inBeneficiaryAccountNumber: z.string().nullable()
});

export const cashTransactionListItemSchema = z.object({
  cashOrderData: cashTransactionDetailSchema,
  pendingTaskData: z.any().nullable()
});