import * as z from "zod"
import type { 
    bankAccountListSchema, 
    cashTransactionCouponPayLoadListSchema, 
    cashTransactionCouponPayLoadSchema, 
    cashTransactionDebitPayLoadListSchema, 
    cashTransactionDebitPayLoadSchema, 
    cashTransactionDetailSchema, 
    cashTransactionFormListSchema, 
    cashTransactionFormSchema, 
    cashTransactionListItemSchema, 
    cashTransactionListSchema, 
    currencyListSchema, 
    isinHoldingListItemSchema, 
    isinHoldingListSchema, 
    isinsListSchema, 
    orgsListSchema, 
    orgsSchema, 
    subOrgSchema, 
    subOrgsListSchema, 
} from "./Schema"

export type bankAccountList = z.infer<typeof bankAccountListSchema>
export type currenciesList = z.infer<typeof currencyListSchema>
export type isinsList = z.infer<typeof isinsListSchema>
export type isinHoldingList = z.infer<typeof isinHoldingListSchema>
export type isinHoldingListItem = z.infer<typeof isinHoldingListItemSchema>
export type orgsList = z.infer<typeof orgsListSchema>
export type subOrgs = z.infer<typeof subOrgSchema>
export type orgs = z.infer<typeof orgsSchema>
export type subOrgsList = z.infer<typeof subOrgsListSchema>
export type cashTransactionList = z.infer<typeof cashTransactionListSchema>
export type cashTransactionListItem = z.infer<typeof cashTransactionListItemSchema>
export type cashTransactionDetail = z.infer<typeof cashTransactionDetailSchema>

//Form Payload gửi lên API
export type cashTransactionDebitPayLoad = z.infer<typeof cashTransactionDebitPayLoadSchema>
export type cashTransactionDebitPayLoadList = z.infer<typeof cashTransactionDebitPayLoadListSchema>

export type cashTransactionCouponPayLoad = z.infer<typeof cashTransactionCouponPayLoadSchema>
export type cashTransactionCouponPayLoadList = z.infer<typeof cashTransactionCouponPayLoadListSchema>

//Form 
export type cashTransactionForm= z.infer<typeof cashTransactionFormSchema>
export type cashTransactionFormList = z.infer<typeof cashTransactionFormListSchema>
