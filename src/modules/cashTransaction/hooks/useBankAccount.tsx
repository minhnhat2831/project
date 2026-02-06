import { useQuery } from "@tanstack/react-query";
import { fetchListBankAccount } from "../api/api";

export const useBankAccount = () => {

    const useGetBankAccounts = (
        currency?: string | null,
        type?: string,
    ) => {
        return useQuery({
            queryKey: ["bankAccounts", currency],
            queryFn: async () => {
                return fetchListBankAccount({ currency, type });
            }
        })
    };

    const useGetBankAccountById = (
    bankAccountUid?: string,
    options?: {
      enabled?: boolean
      onSuccess?: (bank: any) => void
    }
  ) => {
    return useQuery({
      queryKey: ["bankAccount", bankAccountUid],
      enabled: !!bankAccountUid && options?.enabled !== false,
      queryFn: async () => {
        const banks = await fetchListBankAccount({})
        return banks.data.find(
          (b: any) => b.bankAccountUid === bankAccountUid
        )
      },
    })}

    return { useGetBankAccounts, useGetBankAccountById };
}   