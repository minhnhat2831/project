import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { cashTransactionCouponPayLoadList, cashTransactionDebitPayLoadList, cashTransactionFormList } from "../schema/Schema.type"
import { cashTransactionFormListSchema } from "../schema/Schema"
import { useOrg } from "./useOrg"
import { useBankAccount } from "./useBankAccount"
import { TRANSACTION_CREDIT_ENUM, TRANSACTION_DEBIT_ENUM } from "../constants/TransactionType"

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
                couponPayments: [{
                    bankAccountTo: "",
                    cashOrderAmt: 0,
                    clientName: "",
                    organizationNum: "",
                    subAccountNum: "",
                    subOrganizationNum: ""
                }],
                couponPercentageRate: 0,
                feesAmt: 0,
                gstAmt: 0,
                isin: "",
                paymentDo: new Date().toISOString().split("T")[0] ?? "",
                totalCouponAmount: 0,
                createdDo: new Date().toISOString().split("T")[0] ?? "",
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

    useGetSubOrgById(subOrgId, orgId, {
        onSuccess: (subOrg) => {
            if (!subOrg) return
            setValue("data.subOrgNum", subOrg);
        }
    })

    useGetBankAccountById(bankAccountId, {
        onSuccess: (bank) => {
            if (!bank) return;
            setValue("data.bankAccountUid", bank);
        },
    });

    function debitMapFormToPayload(form: cashTransactionFormList): cashTransactionDebitPayLoadList {
        if (form.data.transactionType === TRANSACTION_DEBIT_ENUM.WITHDRAWAL || form.data.transactionType === TRANSACTION_CREDIT_ENUM.DEPOSIT) {
            return {
                action: form.action,
                data: {
                    transactionType: form.data.transactionType,
                    orgNum: form.data.orgNum.id,
                    subOrgNum: form.data.subOrgNum.subOrgId,
                    currency: form.data.currency,
                    amount: form.data.amount,
                    effectiveDo: form.data.effectiveDo,
                    description: form.data.description,
                    bankAccountUid: form.data.bankAccountUid.bankAccountUid,
                    comments: form.data.comments,
                    files: form.data.files,
                    bankChargesAmt: form.data.bankChargesAmt,
                    feesAmt: form.data.feesAmt,
                    gstAmt: form.data.gstAmt,
                    createdDo: form.data.createdDo,
                }
            }
        }

        return {
            action: form.action,
            data: {
                transactionType: form.data.transactionType,
                orgNum: form.data.orgNum.id,
                subOrgNum: form.data.subOrgNum.subOrgId,
                currency: form.data.currency,
                amount: form.data.amount,
                effectiveDo: form.data.effectiveDo,
                description: form.data.description,
                bankAccountUid: form.data.bankAccountUid.bankAccountUid,
                comments: form.data.comments,
                files: form.data.files,
                createdDo: form.data.createdDo,
            }
        }
    }

    function couponMapFormToPayload(form: cashTransactionFormList): cashTransactionCouponPayLoadList {
        return {
            action: form.action,
            data: {
                transactionType: form.data.transactionType,
                currency: form.data.currency,
                description: form.data.description,
                comments: form.data.comments,
                files: form.data.files,
                couponPayments: form.data.couponPayments,
                couponPercentageRate: form.data.couponPercentageRate,
                isin: form.data.isin,
                paymentDo: form.data.paymentDo,
                totalCouponAmount: form.data.totalCouponAmount,
            }
        }
    }

    return {
        method,
        debitMapFormToPayload,
        couponMapFormToPayload
    }
}