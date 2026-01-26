import * as z from "zod"
import type { 
    bankAccountListSchema, 
    cashTransactionFormListSchema, 
    cashTransactionFormSchema, 
    cashTransactionPayLoadListSchema, 
    cashTransactionPayLoadSchema, 
    currencyListSchema, 
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
export type orgsList = z.infer<typeof orgsListSchema>
export type subOrgs = z.infer<typeof subOrgSchema>
export type orgs = z.infer<typeof orgsSchema>
export type subOrgsList = z.infer<typeof subOrgsListSchema>

//Form Payload gửi lên API
export type cashTransactionPayLoad = z.infer<typeof cashTransactionPayLoadSchema>
export type cashTransactionPayLoadList = z.infer<typeof cashTransactionPayLoadListSchema>

//Form 
export type cashTransactionForm= z.infer<typeof cashTransactionFormSchema>
export type cashTransactionFormList = z.infer<typeof cashTransactionFormListSchema>
