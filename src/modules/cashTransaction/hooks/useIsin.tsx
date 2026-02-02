import { useQuery } from "@tanstack/react-query";
import { fetchListIsins, fetchListIsinsHolding } from "../api/api";

export const useIsin = () => {
    const getIsin = () => {
        return useQuery({
            queryKey: ["isin"],
            queryFn: async () => {
                return fetchListIsins();
            }
        })
    };

    const getIsinHolding = (
        isin? : string,
        options?: { enabled?: boolean },
    ) => {
        return useQuery({
            queryKey : ["isinHolding", isin],
            queryFn : async () => 
                fetchListIsinsHolding(isin),
                ...options
        })
    }

    return { getIsin, getIsinHolding };
}