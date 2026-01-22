import { fetchListOrg, fetchListSubOrg } from "../api/api";
import { useQuery } from "@tanstack/react-query";

export const useOrg = () => {
  
  const useGetListOrgs = () => {
    return useQuery({
      queryKey: ["orgs"],
      queryFn: fetchListOrg,
    });
  };

  const useGetListSubOrgs = (
    orgNum?: string,
    options?: { enabled?: boolean },
  ) => {
    return useQuery({
      queryKey: ["subOrgs", orgNum],
      queryFn: async () => fetchListSubOrg(orgNum),
      ...options,
    });
  };

  return { useGetListOrgs, useGetListSubOrgs };
};