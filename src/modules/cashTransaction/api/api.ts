import { mockBankAccounts } from "@/modules/cashTransaction/mock-data/bank-account";
import { mockCurrencies } from "@/modules/cashTransaction/mock-data/currency";
import { mockOrgs, mockSubOrgs } from "@/modules/cashTransaction/mock-data/org";
import type { bankAccountList, cashTransactionList, cashTransactionListItem, currenciesList, isinHoldingList, isinsList, orgs, subOrgs } from "../schema/Schema.type";
import { mockIsinHolding, mockIsins } from "../mock-data/isin";
import { mockListData, mockListDetail } from "../mock-data/list-detail";

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
  currency?: string | null;
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

export const fetchListIsins = async () => {
  return new Promise<{ data: isinsList[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockIsins,
        }),
      500,
    ),
  );
};

export const fetchListIsinsHolding = async (isin?: string) => {
  return new Promise<{ data: isinHoldingList[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockIsinHolding[isin as string] || [],
        }),
      500,
    ),
  );
};

export const fetchListData = async () => {
  return new Promise<{ data: cashTransactionList[] }>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockListData,
        }),
      500,
    ),
  );
};

export const fetchTransactionDetail = async (transactionId?: string,
) => {
  return new Promise<{ data: cashTransactionListItem | null }>((resolve) =>
    setTimeout(() => {
      const detail =
        mockListDetail.find(
          (item) =>
            item.cashOrderData.transactionId === transactionId,
        ) || null;

      resolve({
        data: detail as cashTransactionListItem | null,
      });
    }, 500),
  );
};