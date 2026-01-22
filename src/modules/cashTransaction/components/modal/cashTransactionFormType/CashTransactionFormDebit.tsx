import DateInput from "@/components/common/form/DateTimeInput";
import InputField from "@/components/common/form/Input"
import { useBankAccount } from "@/modules/cashTransaction/hooks/useBankAccount";
import { useCurrency } from "@/modules/cashTransaction/hooks/useCurrency";
import { useOrg } from "@/modules/cashTransaction/hooks/useOrg"
import type { orgs, subOrgs } from "@/modules/cashTransaction/schema/Schema.type";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select"

export default function CashTransactionFormDebit({ type }: { type: "Debit" | "Credit" }) {
    const { useGetListOrgs, useGetListSubOrgs } = useOrg();
    const { data, isLoading } = useGetListOrgs();
    const { control, watch } = useFormContext()
    const watchOrg = watch("orgNum")

    const { data: subOrgData } = useGetListSubOrgs(watchOrg, {
        enabled: !!watchOrg,
    });
    const watchCurrent = watch("currency")

    const { getCurrencies } = useCurrency();
    const { data: currencyData } = getCurrencies();
    const { getBankAccounts } = useBankAccount();
    const { data: bankAccountData } = getBankAccounts(watchCurrent, type);

    const subOrgOptions =
        subOrgData?.data
            ?.map((sub: subOrgs) => ({
                value: sub.subOrgId,
                label: sub.name,
            })) ?? []

    return (<>
        <div className="flex py-5 items-center">
            <label className="mr-14 mt-1">Client Name</label>
            <Controller
                name="orgNum"
                control={control}
                render={({ field }) => (
                    <Select
                        className="w-auto"
                        isLoading={isLoading}
                        isClearable
                        options={data?.data?.map((org: orgs) => ({
                            value: org.id,
                            label: org.shortName,
                        }))}
                        value={field.value
                            ? {
                                value: field.value,
                                label:
                                    data?.data?.find(o => o.id === field.value)?.shortName,
                            }
                            : null}
                        onChange={(option) => field.onChange(option?.value ?? null)}
                    ></Select>
                )}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-9 mt-1 text-center">Sub-Org Name</label>
            <Controller
                name="subOrgNum"
                control={control}
                render={({ field }) => (
                    <Select
                        className="w-auto"
                        isClearable
                        isDisabled={!watchOrg}
                        options={subOrgOptions}
                        value={
                            field.value
                                ? subOrgOptions.find(o => o.value === field.value) ?? null
                                : (subOrgOptions.length === 1 ? subOrgOptions[0] : null)
                        }
                        onChange={(option) => field.onChange(option?.value ?? null)}
                    />
                )}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-14 mt-1">Transaction ID</label>
            <p> - </p>
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-17 mt-1">Currency<span className="text-red-500"> *</span></label>
            <Controller
                name="currency"
                control={control}
                render={({ field }) => (
                    <Select
                        className="w-auto"
                        isClearable
                        options={currencyData?.map((currency) => ({
                            value: currency,
                            label: currency,
                        }))}
                        value={field.value
                            ? {
                                value: field.value,
                                label: field.value
                            }
                            : null}
                        onChange={(option) => field.onChange(option?.value ?? null)}
                    />
                )}
            />
        </div>

        <div className="flex items-center">
            <label className="mr-14 mt-1 ">Amount<span className="text-red-500"> *</span></label>
            <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                    <InputField variant="form"
                        type="number"
                        inputSize="lg"
                        value={field.value}
                        onChange={e => field.onChange(Number(e.target.value))}>
                    </InputField>
                )}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-4 mt-1">Effective Date<span className="text-red-500"> *</span></label>
            <Controller
                name="effectiveDo"
                control={control}
                render={({ field }) => (
                    <DateInput {...field} />
                )}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-2 mt-1">Bank Details (From)</label>
            <Controller
                name="bankAccountUid"
                control={control}
                render={({ field }) => (
                    <Select
                        className="w-auto"
                        isClearable
                        options={
                            bankAccountData?.data.map(bank => ({
                                value: bank.bankAccountUid,
                                label: bank.beneficiaryName,
                            })) ?? []
                        }
                        value={
                            field.value
                                ? {
                                    value: field.value,
                                    label:
                                        bankAccountData?.data.find(
                                            b => b.bankAccountUid === field.value
                                        )?.beneficiaryName,
                                }
                                : null
                        }
                        onChange={option =>
                            field.onChange(option?.value ?? null)
                        }
                    />
                )}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-11 mt-1">Description</label>
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <InputField
                        variant="form"
                        inputSize="lg"
                        value={field.value}
                        onChange={e => field.onChange((e.target.value))}
                    ></InputField>
                )}
            />
        </div>
        <div className="flex py-5 items-center">
            <label className="mr-5 mt-1">Created Date<span className="text-red-500"> *</span></label>
            <Controller
                name="createdDo"
                control={control}
                render={({ field }) => (
                    <DateInput {...field} disabled />
                )}
            />
        </div>
    </>)
}