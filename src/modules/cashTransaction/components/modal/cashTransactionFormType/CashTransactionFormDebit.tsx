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

    const watchCurrency = watch("data.currency")
    const { useGetCurrencies } = useCurrency();
    const { data: currencyData } = useGetCurrencies();
    const { useGetBankAccounts } = useBankAccount();
    const { data: bankAccountData } = useGetBankAccounts(watchCurrency, transactionType);

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

    // const getFirstValue = () => {
    //     if (!subOrgData?.data) return;

    //     if (subOrgData.data.length !== 1) {
    //         setValue("data.subOrgNum", null);
    //         return;
    //     }

    //     const subOrg = subOrgData.data[0];

    //     setValue("data.subOrgNum", {
    //         subOrgId: subOrg.subOrgId,
    //         name: subOrg.name,
    //         description: subOrg.description,
    //         orgId: subOrg.orgId,
    //     });
    // }

    const currencyOption = currencyData?.map((currency) => ({
        value: currency,
        label: currency,
    }))

    const bankAccountOption = bankAccountData?.data.map(bank => ({
        value: bank?.bankAccountUid,
        label: bank?.displayName,
    })) ?? []

    const checkBankForCurrency = (bankAccountUid: string | null) => {
        if (!bankAccountUid) {
            setValue("data.bankAccountUid.bankAccountUid", "");
            return;
        }
        const selectedBank = bankAccountData?.data.find(
            bank => bank?.bankAccountUid === bankAccountUid
        );

        if (selectedBank?.currency) {
            setValue("data.currency", selectedBank.currency);
        }

        if (!selectedBank) return

        setValue("data.bankAccountUid",
            {
                bankAccountUid: selectedBank.bankAccountUid,
                currency: selectedBank.currency,
                beneficiaryName: selectedBank.beneficiaryName,
                beneficiaryBankName: selectedBank.beneficiaryBankName,
                beneficiaryBankAccountNumber: selectedBank.beneficiaryBankAccountNumber,
                beneficiaryBankSwift: selectedBank.beneficiaryBankSwift,
                correspondentBankName: selectedBank.correspondentBankName,
                correspondentBankSwift: selectedBank.correspondentBankSwift,
                displayName: selectedBank.displayName,
            })
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
            <label className="mt-1 w-50 shrink-0">Client Name</label>
            <SelectForm
                name="data.orgNum.id"
                isLoading={isLoading}
                control={control}
                options={orgOption}
                onValueChange={(value) => {
                    setValue("data.subOrgNum", "")
                    setValue("data.subOrgNum.subOrgId", "")
                    const org = data?.data.find(f => f.id === value)
                    if (!org) return

                    setValue("data.orgNum",
                        {
                            id: org.id,
                            name: org.name,
                            shortName: org.shortName,
                            countryCode: org.countryCode
                        })


                }}
                error={get(errors, "data.orgNum.id.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="mt-1 w-50 shrink-0">Sub-Org Name</label>
            <SelectForm
                name="data.subOrgNum.subOrgId"
                control={control}
                isDisabled={!watchOrg}
                options={subOrgOptions}
                onValueChange={(value) => {
                    setValue("data.subOrgNum.subOrgId", value, {
                        shouldDirty: true,
                        shouldTouch: true
                    })
                    const subOrg = subOrgData?.data.find(f => f.subOrgId === value)
                    if (!subOrg) return ""

                    setValue("data.subOrgNum",
                        {
                            name: subOrg.name,
                            description: subOrg.description,
                            subOrgId: subOrg.subOrgId,
                            orgId: subOrg.orgId
                        })
                }}
                error={get(errors, "data.subOrgNum.subOrgId.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1 shrink-0">Transaction ID</label>
            <p> - </p>
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1 shrink-0">Currency<span className="text-red-500"> *</span></label>
            <SelectForm
                name="data.currency"
                control={control}
                options={currencyOption}
                onValueChange={(value) => {
                    setValue("data.currency", value)
                    setValue("data.bankAccountUid.bankAccountUid", "")
                }}
                error={get(errors, "data.currency.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1 shrink-0">Amount<span className="text-red-500"> *</span></label>
            <NumberInputForm
                name="data.amount"
                control={control}
            >
            </NumberInputForm>
        </div>

        {checkType() && <>
            <div className="flex py-5 items-center">
                <label className="w-50 mt-1 shrink-0">Fees<span><Icons.Error /></span></label>
                <NumberInputForm
                    name="data.feesAmt"
                    control={control}
                    error={get(errors, "data.feesAmt.message")}
                ></NumberInputForm>
            </div>

            <div className="flex py-5 items-center">
                <label className="w-50 mt-1 shrink-0">GST Amount<span><Icons.Error /></span></label>
                <NumberInputForm
                    name="data.gstAmt"
                    control={control}
                    error={get(errors, "data.gstAmt.message")}
                ></NumberInputForm>
            </div>

            <div className="flex py-5 items-center">
                <label className="mt-1 w-50 shrink-0">Bank Charges Amount<span className="text-red-500"> *</span></label>
                <NumberInputForm
                    name="data.bankChargesAmt"
                    control={control}
                    error={get(errors, "data.bankChargesAmt.message")}
                ></NumberInputForm>
            </div>
        </>}

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1 shrink-0">Effective Date<span className="text-red-500"> *</span></label>
            <Controller
                name="data.effectiveDo"
                control={control}
                render={({ field }) => (
                    <DateInput {...field} />
                )}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1 shrink-0">Bank Details (From)</label>
            <SelectForm
                name="data.bankAccountUid.bankAccountUid"
                control={control}
                options={bankAccountOption}
                onValueChange={(value) => {
                    checkBankForCurrency(value)
                }}
                error={get(errors, "data.bankAccountUid.message")}
            />
        </div>

        <div className="flex py-5 items-center">
            <label className="w-46 mt-1 shrink-0">Description<span className="text-red-500"> *</span></label>
            <InputForm
                name="data.description"
                control={control}
                error={get(errors, "data.description.message")}
            ></InputForm>
        </div>

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1 shrink-0">Created Date<span className="text-red-500"> *</span></label>
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