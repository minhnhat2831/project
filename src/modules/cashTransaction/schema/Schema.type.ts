import * as z from "zod"
import type { 
    bankAccountListSchema, 
    cashTransactionListSchema, 
    cashTransactionFormSchema, 
    cashTransactionRequestSchema, 
    cashTransactionWithdrawalRequestSchema, 
    currencyListSchema, 
    isinHoldingListSchema, 
    isinsListSchema, 
    orgsListSchema, 
    orgsSchema, 
    subOrgSchema, 
    subOrgsListSchema 
} from "./Schema"

export type bankAccountList = z.infer<typeof bankAccountListSchema>
export type currenciesList = z.infer<typeof currencyListSchema>
export type isinsList = z.infer<typeof isinsListSchema>
export type isinHoldingList = z.infer<typeof isinHoldingListSchema>
export type orgsList = z.infer<typeof orgsListSchema>
export type subOrgs = z.infer<typeof subOrgSchema>
export type orgs = z.infer<typeof orgsSchema>
export type subOrgsList = z.infer<typeof subOrgsListSchema>

export type cashTransactionList = z.infer<typeof cashTransactionListSchema>
export type cashTransactionForm = z.infer<typeof cashTransactionFormSchema>

export type cashTransactionRequest = z.infer<typeof cashTransactionRequestSchema>
export type cashTransactionWithdrawalRequest = z.infer<typeof cashTransactionWithdrawalRequestSchema>
