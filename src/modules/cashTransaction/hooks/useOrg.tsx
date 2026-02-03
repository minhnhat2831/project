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

  const useGetSubOrgById = (
    subOrgId?: string,
    orgId?: string,
    options?: {
      onSuccess?: (org: any) => void
    }
  ) => {
    return useQuery({
      queryKey: ["subOrgs", subOrgId],
      queryFn: async () => {
        const mo = await fetchListSubOrg(orgId);
        mo.data?.find(
          s => s.subOrgId === subOrgId
        )
      }
    })
  }

  const useGetOrgById = (
    orgId?: string,
    options?: {
      onSuccess?: (org: any) => void
    }
  ) => {
    return useQuery({
      queryKey: ["org", orgId],
      queryFn: async () => {
        const orgs = await fetchListOrg()
        orgs.data.find((o: any) => o.id === orgId)
      },
    });
  }
  return { useGetListOrgs, useGetListSubOrgs, useGetOrgById, useGetSubOrgById };
};