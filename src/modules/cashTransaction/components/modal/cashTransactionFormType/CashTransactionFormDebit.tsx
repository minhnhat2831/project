import { Icons } from "@/components/common/base/Icon";
import DateInput from "@/components/common/form/DateTimeInput";
import InputForm from "@/components/common/form/InputForm";
import SelectForm from "@/components/common/form/SelectForm";
import { useBankAccount } from "@/modules/cashTransaction/hooks/useBankAccount";
import { useCurrency } from "@/modules/cashTransaction/hooks/useCurrency";
import { useOrg } from "@/modules/cashTransaction/hooks/useOrg"
import type { orgs, subOrgs } from "@/modules/cashTransaction/schema/Schema.type";
import { Controller, get, useFormContext } from "react-hook-form";

export default function CashTransactionFormDebit({ transactionType }: { transactionType: "Debit" | "Debit(other)" }) {
    const { useGetListOrgs, useGetListSubOrgs } = useOrg();
    const { data, isLoading } = useGetListOrgs();
    const { control, watch, formState: { errors } } = useFormContext()
    const watchOrg = watch("data.orgNum.id")

    const { data: subOrgData } = useGetListSubOrgs(watchOrg, {
        enabled: !!watchOrg,
    });
    const watchCurrent = watch("data.currency")

    const { getCurrencies } = useCurrency();
    const { data: currencyData } = getCurrencies();
    const { getBankAccounts } = useBankAccount();
    const { data: bankAccountData } = getBankAccounts(watchCurrent, transactionType);

    const subOrgOptions =
        subOrgData?.data
            ?.map((sub: subOrgs) => ({
                value: sub.subOrgId,
                label: sub.name,
            })) ?? []

    const option = data?.data?.map((org: orgs) => ({
        value: org.id,
        label: org.shortName,
    }))

    return (<>
        <div className="flex py-5 items-center">
            <label className="mr-26 mt-1">Client Name</label>
            <SelectForm
                name="data.orgNum.id"
                isLoading={isLoading}
                control={control}
                options={option}
                error={get(errors, "data.orgNum.id.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-21 mt-1">Sub-Org Name</label>
            <SelectForm
                name="data.subOrgNum.subOrgId"
                control={control}
                isDisabled={!watchOrg}
                options={subOrgOptions}
                error={get(errors, "data.subOrgNum.subOrgId.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-24 mt-1">Transaction ID</label>
            <p> - </p>
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-29 mt-1">Currency<span className="text-red-500"> *</span></label>
            <SelectForm
                name="data.currency"
                control={control}
                options={currencyData?.map((currency) => ({
                    value: currency,
                    label: currency,
                }))}
                error={get(errors, "data.currency.message")}
            />
        </div>

        <div className="flex items-center">
            <label className="mr-26 mt-1 ">Amount<span className="text-red-500"> *</span></label>
            <InputForm
                name="data.amount"
                control={control}
                type="number"
                error={get(errors, "data.amount.message")}
            >
            </InputForm>
        </div>

        {transactionType === "Debit(other)" && <>
            <div className="flex items-center">
                <label className="mr-30 mt-1 ">Fees<span><Icons.Error /></span></label>
                <InputForm
                    name="data.feesAmt"
                    control={control}
                    type="number"
                    error={get(errors, "data.feesAmt.message")}
                ></InputForm>
            </div>

            <div className="flex items-center">
                <label className="mr-15 mt-1 ">GST Amount<span><Icons.Error /></span></label>
                <InputForm
                    name="data.gstAmt"
                    control={control}
                    type="number"
                    error={get(errors, "data.gstAmt.message")}
                ></InputForm>
            </div>

            <div className="flex items-center">
                <label className="mr-2 mt-1 ">Bank Charges Amount<span className="text-red-500"> *</span></label>
                <InputForm
                    name="data.bankChargesAmt"
                    control={control}
                    type="number"
                    error={get(errors, "data.bankChargesAmt.message")}
                ></InputForm>
            </div>
        </>}

        <div className="flex py-5 items-center">
            <label className="mr-17 mt-1">Effective Date<span className="text-red-500"> *</span></label>
            <Controller
                name="data.effectiveDo"
                control={control}
                render={({ field }) => (
                    <DateInput {...field} />
                )}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-13 mt-1">Bank Details (From)</label>
            <SelectForm
                name="data.bankAccountUid.bankAccountUid"
                control={control}
                options={bankAccountData?.data.map(bank => ({
                    value: bank.bankAccountUid,
                    label: bank.beneficiaryName,
                })) ?? []}
                error={get(errors, "data.bankAccountUid.bankAccountUid.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-23 mt-1">Description</label>
            <InputForm
                name="data.description"
                control={control}
                type="text"
                error={get(errors, "data.description.message")}
            ></InputForm>
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-17 mt-1">Created Date<span className="text-red-500"> *</span></label>
            <Controller
                name="data.createdDo"
                control={control}
                render={({ field }) => (
                    <DateInput {...field} disabled />
                )}
            />
        </div>
    </>)
}