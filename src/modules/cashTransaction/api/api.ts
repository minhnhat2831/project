import { mockBankAccounts } from "@/modules/cashTransaction/mock-data/bank-account";
import { mockCurrencies } from "@/modules/cashTransaction/mock-data/currency";
import { mockOrgs, mockSubOrgs } from "@/modules/cashTransaction/mock-data/org";
import type { bankAccountList, currenciesList, orgs, subOrgs } from "../schema/Schema.type";

export const fetchListOrg = async () => {
  return new Promise<{ data: orgs[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockOrgs,
        }),
      500,
    ),
  );
};

export const fetchListSubOrg = async (orgNum?: string) => {
  return new Promise<{ data: subOrgs[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockSubOrgs[orgNum as string] || [],
        }),
      500,
    ),
  );
};

export const fetchListCurrency = async () => {
  return new Promise<currenciesList>((resolve) =>
    setTimeout(() => resolve(mockCurrencies), 500),
  );
};

export const fetchListBankAccount = async ({
  currency,
}: {
  currency?: string;
  type?: string;
}) => {
  const filteredAccounts = !!currency
    ? mockBankAccounts.filter((account) => account.currency === currency)
    : mockBankAccounts;
  return new Promise<{ data: bankAccountList[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: filteredAccounts,
        }),
      500,
    ),
  );
};