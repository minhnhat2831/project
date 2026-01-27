import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { cashTransactionFormList, cashTransactionPayLoadList } from "../schema/Schema.type"
import { cashTransactionFormListSchema } from "../schema/Schema"
import { useOrg } from "./useOrg"
import { useBankAccount } from "./useBankAccount"

export default function useTransactionForm() {
    const method = useForm<cashTransactionFormList>({
        resolver: zodResolver(cashTransactionFormListSchema),
        defaultValues: {
            action: "Draft",
            data: {
                transactionType: "",
                orgNum: {
                    id: "",
                    name: "",
                    countryCode: "",
                    shortName: ""
                },
                subOrgNum: {
                    orgId: "",
                    subOrgId: "",
                    description: "",
                    name: "",
                },
                currency: "",
                amount: 0,
                effectiveDo: new Date().toISOString().split("T")[0] ?? "",
                description: "",
                bankAccountUid: {
                    bankAccountUid: "",
                    currency: "",
                    beneficiaryName: "",
                    beneficiaryBankName: "",
                    beneficiaryBankAccountNumber: "",
                    beneficiaryBankSwift: "",
                    correspondentBankName: "",
                    correspondentBankSwift: "",
                    displayName: "",
                },
                comments: "",
                files: [],
                bankChargesAmt: 0,
                couponPayments: {
                    bankAccountTo: "",
                    cashOrderAmt: 0,
                    clientName: "",
                    currency: "",
                    organizationNum: "",
                    subAccountNum: "",
                    subOrganizationNum: ""
                },
                couponPercentageRate: 0,
                feesAmt: 0,
                gstAmt: 0,
                isin: "",
                paymentDo: "",
                totalCouponAmount: 0,
                createdDo: new Date().toISOString().split("T")[0],
            }
        }
    })
    const { watch, setValue } = method

    const orgId = watch("data.orgNum.id")
    const subOrgId = watch("data.subOrgNum.subOrgId")
    const bankAccountId = watch("data.bankAccountUid.bankAccountUid")

    const { useGetOrgById, useGetSubOrgById } = useOrg();
    const { useGetBankAccountById } = useBankAccount();
    useGetOrgById(orgId, 
        {
        onSuccess: (org) => {
            if (!org) return;
            setValue("data.orgNum", org);
        },
    });

    useGetSubOrgById(subOrgId, orgId,{
        onSuccess:(subOrg) => {
            if(!subOrg) return
            setValue("data.subOrgNum", subOrg);
        }
    } )

    useGetBankAccountById(bankAccountId, {
        onSuccess: (bank) => {
            if (!bank) return;
            setValue("data.bankAccountUid", bank);
        },
    });

    function mapFormToPayload(form: cashTransactionFormList): cashTransactionPayLoadList {
        return {
            action: form.action,
            data: {
                transactionType: form.data.transactionType,
                orgNum : form.data.orgNum.id,
                subOrgNum: form.data.subOrgNum.subOrgId,
                currency: form.data.currency,
                amount: form.data.amount,
                effectiveDo: form.data.effectiveDo,
                description: form.data.description,
                bankAccountUid: form.data.bankAccountUid.bankAccountUid,
                comments: form.data.comments,
                files: form.data.files,
                bankChargesAmt: form.data.bankChargesAmt,
                couponPayments: form.data.couponPayments,
                couponPercentageRate: form.data.couponPercentageRate,
                feesAmt: form.data.feesAmt,
                gstAmt: form.data.gstAmt,
                isin: form.data.isin,
                paymentDo: form.data.paymentDo,
                totalCouponAmount: form.data.totalCouponAmount,
                createdDo: form.data.createdDo,
            }
        }
    }

    return {
        method,
        mapFormToPayload
    }
}