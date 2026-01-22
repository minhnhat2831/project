import { useQuery } from "@tanstack/react-query";
import { fetchListCurrency } from "../api/api";

export const useCurrency = () => {
    const getCurrencies = () => {
        return useQuery({
            queryKey: ["currencies"],
            queryFn: async () => {
                return fetchListCurrency();
            }
        })
    };

    return { getCurrencies };
}