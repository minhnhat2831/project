import { Icons } from "@/components/common/base/Icon";
import DateInput from "@/components/common/form/baseForm/DateTimeInput";
import InputForm from "@/components/common/form/controllerForm/InputForm";
import NumberInputForm from "@/components/common/form/controllerForm/NumberInputForm";
import SelectForm from "@/components/common/form/controllerForm/SelectForm";
import { TRANSACTION_CREDIT_ENUM, TRANSACTION_DEBIT_ENUM } from "@/modules/cashTransaction/constants/TransactionType";
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

    const orgOption = data?.data?.map((org: orgs) => ({
        value: org.id,
        label: org.name,
    }))

    function getFirstValue() {
        if (subOrgOptions.length === 1) {
            setValue("data.subOrgNum.subOrgId", subOrgOptions[0].value);
        }else{
            setValue("data.subOrgNum.subOrgId", "")
        }
    }

    const currencyOption = currencyData?.map((currency) => ({
        value: currency,
        label: currency,
    }))

    const bankAccountOption = bankAccountData?.data.map(bank => ({
        value: bank.bankAccountUid,
        label: bank.displayName,
    })) ?? []

    function checkBankForCurrency(bankAccountUid: string | null) {
        const selectedBank = bankAccountData?.data.find(
            bank => bank.bankAccountUid === bankAccountUid
        );

        if (selectedBank?.currency) {
            setValue("data.currency", selectedBank.currency);
        }
    }

    function checkType() {
        if (transactionType === TRANSACTION_DEBIT_ENUM.WITHDRAWAL
            || transactionType === TRANSACTION_CREDIT_ENUM.DEPOSIT) {
            return true
        }
        return false
    }

    return (<>
        <div className="flex py-5 items-center">
            <label className="mt-1 w-50">Client Name</label>
            <SelectForm
                name="data.orgNum.id"
                isLoading={isLoading}
                control={control}
                options={orgOption}
                onValueChange={getFirstValue}
                error={get(errors, "data.orgNum.id.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mt-1 w-50">Sub-Org Name</label>
            <SelectForm
                name="data.subOrgNum.subOrgId"
                control={control}
                isDisabled={!watchOrg}
                options={subOrgOptions}
                error={get(errors, "data.subOrgNum.subOrgId.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1">Transaction ID</label>
            <p> - </p>
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1">Currency<span className="text-red-500"> *</span></label>
            <SelectForm
                name="data.currency"
                control={control}
                options={currencyOption}
                error={get(errors, "data.currency.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1">Amount<span className="text-red-500"> *</span></label>
            <NumberInputForm
                name="data.amount"
                control={control}
                error={get(errors, "data.amount.message")}
            >
            </NumberInputForm>
        </div>

        {checkType() && <>
            <div className="flex py-5 items-center">
                <label className="w-50 mt-1 ">Fees<span><Icons.Error /></span></label>
                <NumberInputForm
                    name="data.feesAmt"
                    control={control}
                    error={get(errors, "data.feesAmt.message")}
                ></NumberInputForm>
            </div>

            <div className="flex py-5 items-center">
                <label className="w-50 mt-1">GST Amount<span><Icons.Error /></span></label>
                <NumberInputForm
                    name="data.gstAmt"
                    control={control}
                    error={get(errors, "data.gstAmt.message")}
                ></NumberInputForm>
            </div>

            <div className="flex py-5 items-center">
                <label className="mt-1 w-50">Bank Charges Amount<span className="text-red-500"> *</span></label>
                <NumberInputForm
                    name="data.bankChargesAmt"
                    control={control}
                    error={get(errors, "data.bankChargesAmt.message")}
                ></NumberInputForm>
            </div>
        </>}

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1">Effective Date<span className="text-red-500"> *</span></label>
            <Controller
                name="data.effectiveDo"
                control={control}
                render={({ field }) => (
                    <DateInput {...field} />
                )}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1">Bank Details (From)</label>
            <SelectForm
                name="data.bankAccountUid.bankAccountUid"
                control={control}
                options={bankAccountOption}
                onValueChange={checkBankForCurrency}
                error={get(errors, "data.bankAccountUid.bankAccountUid.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="w-46 mt-1">Description</label>
            <InputForm
                name="data.description"
                control={control}
                error={get(errors, "data.description.message")}
            ></InputForm>
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1">Created Date<span className="text-red-500"> *</span></label>
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