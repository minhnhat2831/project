import * as z from "zod";
import type { 
    voucherDeleteSchema, 
    voucherDoulaListItemScheme, 
    voucherDoulaListScheme, 
    voucherDoulaParamsSchema, 
    voucherListItemScheme, 
    voucherListScheme, 
    voucherParamsSchema, 
    voucherRequestScheme, 
    voucherResponseSchema 
} from "./VoucherSchema";

export type voucherParams = z.infer<typeof voucherParamsSchema>;

export type voucherRequest = z.infer<typeof voucherRequestScheme>;

export type voucherListItem = z.infer<typeof voucherListItemScheme>;

export type voucherList = z.infer<typeof voucherListScheme>;

export type voucherResponse = z.infer<typeof voucherResponseSchema>;

export type voucherDeleteRequest = z.infer<typeof voucherDeleteSchema>;

//=======================DoulaVoucher================================
export type voucherDoulaParams = z.infer<typeof voucherDoulaParamsSchema>;

export type voucherDoulaListItem = z.infer<typeof voucherDoulaListItemScheme>;

export type voucherDoulaList = z.infer<typeof voucherDoulaListScheme>;







