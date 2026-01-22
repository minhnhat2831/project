import { useQuery } from "@tanstack/react-query";
import { fetchListBankAccount } from "../api/api";

export const useBankAccount = () => {

    const getBankAccounts = (
        currency?: string,
        type?: string,
    ) => {
        return useQuery({
            queryKey: ["bankAccounts", currency],
            queryFn: async () => {
                return fetchListBankAccount({ currency, type });
            }
        })
    };

    return { getBankAccounts };
}   