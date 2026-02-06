import { useQuery } from "@tanstack/react-query";
import { fetchListIsins, fetchListIsinsHolding } from "../api/api";
import type { isinHoldingList } from "../schema/Schema.type";

export const useIsin = () => {
    const useGetIsin = () => {
        return useQuery({
            queryKey: ["isin"],
            queryFn: async () => {
                return fetchListIsins();
            }
        })
    };

    const useGetIsinHolding = (
        isin?: string,
        options?: {
            enabled?: boolean,
            onSuccess?: (isin: isinHoldingList) => void
        },
    ) => {
        return useQuery({
            queryKey: ["isinHolding", isin],
            queryFn: async () => 
                fetchListIsinsHolding(isin),
                ...options
        })
    }

    return { useGetIsin, useGetIsinHolding };
}