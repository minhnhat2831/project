import { useQuery } from "@tanstack/react-query";
import { fetchListData, fetchTransactionDetail } from "../api/api";

export const useList = () => {
  const useGetList = () => {
    return useQuery({
      queryKey: ["list"],
      queryFn: fetchListData,
    });
  };

  const useGetListDetail = (
    transactionId?: string,
    options?: { enabled?: boolean }
  ) => {
    return useQuery({
      queryKey: ["list-detail", transactionId],
      queryFn: async () => fetchTransactionDetail(transactionId),
      ...options,
    });
  }

  return { useGetList, useGetListDetail }
}