import { Icons } from "@/components/common/base/Icon";
import DateInput from "@/components/common/form/DateTimeInput";
import InputForm from "@/components/common/form/InputForm";
import NumberInputForm from "@/components/common/form/NumberInputForm";
import SelectForm from "@/components/common/form/SelectForm";
import { useBankAccount } from "@/modules/cashTransaction/hooks/useBankAccount";
import { useCurrency } from "@/modules/cashTransaction/hooks/useCurrency";
import { useOrg } from "@/modules/cashTransaction/hooks/useOrg"
import type { orgs, subOrgs } from "@/modules/cashTransaction/schema/Schema.type";
import { Controller, get, useFormContext } from "react-hook-form";

export default function CashTransactionFormDebit({ transactionType }: { transactionType: string }) {
    const { useGetListOrgs, useGetListSubOrgs } = useOrg();
    const { data, isLoading } = useGetListOrgs();
    const { control, watch, formState: { errors }, setValue } = useFormContext()
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

    function checkType() {
        if (transactionType === "Debit (Others)" || transactionType === "Credit (Others)") {
            return true
        }
        return false
    }

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

        <div className="flex py-5 items-center">
            <label className="mr-30 mt-1 ">Amount<span className="text-red-500"> *</span></label>
            <NumberInputForm
                name="data.amount"
                control={control}
                error={get(errors, "data.amount.message")}
            >
            </NumberInputForm>
        </div>

        {checkType() && <>
            <div className="flex py-5 items-center">
                <label className="mr-33 mt-1 ">Fees<span><Icons.Error /></span></label>
                <NumberInputForm
                    name="data.feesAmt"
                    control={control}
                    error={get(errors, "data.feesAmt.message")}
                ></NumberInputForm>
            </div>

            <div className="flex py-5 items-center">
                <label className="mr-19 mt-1 ">GST Amount<span><Icons.Error /></span></label>
                <NumberInputForm
                    name="data.gstAmt"
                    control={control}
                    error={get(errors, "data.gstAmt.message")}
                ></NumberInputForm>
            </div>

            <div className="flex py-5 items-center">
                <label className="mt-1 mr-6">Bank Charges Amount<span className="text-red-500"> *</span></label>
                <NumberInputForm
                    name="data.bankChargesAmt"
                    control={control}
                    error={get(errors, "data.bankChargesAmt.message")}
                ></NumberInputForm>
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
                onValueChange={(bankAccountUid) => {
                    const selectedBank = bankAccountData?.data.find(
                        bank => bank.bankAccountUid === bankAccountUid
                    );

                    if (selectedBank?.currency) {
                        setValue("data.currency", selectedBank.currency);
                    }
                }}
                error={get(errors, "data.bankAccountUid.bankAccountUid.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-23 mt-1">Description</label>
            <InputForm
                name="data.description"
                control={control}
                error={get(errors, "data.description.message")}
            ></InputForm>
        </div>

        <div className="flex py-5 items-center">
            <label className="mr-18 mt-1">Created Date<span className="text-red-500"> *</span></label>
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