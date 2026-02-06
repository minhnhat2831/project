import DateInput from "@/components/common/form/baseForm/DateTimeInput"
import InputForm from "@/components/common/form/controllerForm/InputForm"
import SelectForm from "@/components/common/form/controllerForm/SelectForm"
import { useIsin } from "@/modules/cashTransaction/hooks/useIsin"
import type { bankAccountList, isinsList } from "@/modules/cashTransaction/schema/Schema.type"
import { Controller, get, useFormContext } from "react-hook-form"
import NumberInputForm from "@/components/common/form/controllerForm/NumberInputForm"
import { useBankAccount } from "@/modules/cashTransaction/hooks/useBankAccount"
import { useEffect } from "react"
import { TRANSACTION_CREDIT_ENUM, TRANSACTION_TYPE_LABEL_MAP } from "@/modules/cashTransaction/constants/TransactionType"

export default function CashTransactionFormCoupon() {
    const { control, formState: { errors }, watch, setValue, getValues } = useFormContext()
    const { useGetIsin, useGetIsinHolding } = useIsin()
    const { data: isinData } = useGetIsin()

    const watchIsin = watch("data.isin");
    const isinCurrency = isinData?.data.find(f => f.isin === watchIsin)?.currency
    const { useGetBankAccounts } = useBankAccount()
    const { data: bankAccountData } = useGetBankAccounts(isinCurrency)

    const { data: isinHoldingData } = useGetIsinHolding(watchIsin, {
        enabled: !!watchIsin
        // ,onSuccess: (data: isinHoldingList) => {
        //     if (!isinHoldingData?.data?.length) return

        //     setValue("data.couponPayments", ({
        //         bankAccountTo: "",
        //         cashOrderAmt: Number(data.effectiveValueAmt || 0),
        //         clientName: data.clientName,
        //         organizationNum: data.organizationNum,
        //         subOrganizationNum: data.subOrganizationNum,
        //         subAccountNum: data.subAccountNum,
        //     }))
        // }
    })

    const bankAccountOption = bankAccountData?.data.map((bank: bankAccountList) => ({
        value: bank.bankAccountUid,
        label: bank.displayName,
    }))

    //option : gắn vào schema (value và label)
    const isinsOption = isinData?.data.map((Isins: isinsList) => ({
        value: Isins.isin,
        label: Isins.isin,
    }))

    useEffect(() => {
        if (!isinHoldingData?.data?.length) return

        setValue(
            "data.couponPayments",
            isinHoldingData.data.map((item) => ({
                bankAccountTo: "",
                cashOrderAmt: Number(item.effectiveValueAmt || 0),
                clientName: item.clientName,
                subOrganizationName: item.subOrganizationName,
                organizationNum: item.organizationNum,
                subOrganizationNum: item.subOrganizationNum,
                subAccountNum: item.subAccountNum,
            }))
        )
        setValue("data.currency", isinCurrency)
    }, [isinHoldingData, setValue])

    return (<>
        <div className="flex py-5 items-center">
            <label className="w-50 mt-1 shrink-0">ISIN</label>
            <SelectForm
                name='data.isin'
                control={control}
                options={isinsOption}
                error={get(errors, "data.isin.message")}
                onValueChange={(value) => {
                    setValue("data.isin", value);
                    setValue("data.description", `${TRANSACTION_TYPE_LABEL_MAP[TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT]} ${value}`);
                }}

            ></SelectForm>
        </div>
        {watchIsin && <>
            <div className="flex py-5 items-center">
                <label className="w-50 mr-2 mt-1 shrink-0">Security Name</label>
                {watchIsin
                    ? isinData?.data.find(i => i.isin === watchIsin)?.securityName
                    : "---"}
            </div>

            <div className="flex py-5 items-center">
                <label className="w-46 mt-1 shrink-0">Coupon Payment Rate</label>
                <InputForm
                    name="data.couponPercentageRate"
                    type="number"
                    control={control}
                    error={get(errors, "data.couponPercentageRate.message")}
                    onValueChange={(e) => {
                        const payments = getValues("data.couponPayments") || []
                        const rate = Number(e) * 0.01

                        const updated = payments.map((p: { cashOrderAmt: number }) => ({
                            ...p, netPaymentAmount: rate * Number(p.cashOrderAmt || 0)
                        }))

                        updated.forEach((p: any, index: number) => {
                            setValue(`data.couponPayments.${index}.netPaymentAmount`, p.netPaymentAmount)
                        })

                        const total = updated.reduce(
                            (sum: number, p: any) => sum + Number(p.netPaymentAmount || 0), 0)

                        setValue("data.totalCouponAmount", total)
                    }}
                >
                </InputForm>
                <p>%</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm border">
                    <thead className="sticky -top-4 z-20 border bg-white">
                        <tr className="border-b-2">
                            <th className="px-3 py-4 text-left font-semibold border whitespace-nowrap">Client Name / Sub-org Name</th>
                            <th className="px-3 py-4 text-left font-semibold border whitespace-nowrap">Bank Account(To)</th>
                            <th className="px-3 py-4 text-left font-semibold border whitespace-nowrap">Value of Settled Holdings</th>
                            <th className="px-3 py-4 text-left font-semibold border whitespace-nowrap">Net Payment Amount(EUR)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!watchIsin && (
                            <tr>
                                <td colSpan={4} className="text-center py-6 text-gray-400 font-serif">
                                    No result
                                </td>
                            </tr>
                        )}

                        {watchIsin && (
                            <>{isinHoldingData?.data.map((isins, index) => (
                                <tr key={index}>
                                    <td className="px-3 py-3 border font-serif">
                                        <span>{`${isins.clientName} / ${isins.subOrganizationName}`}</span>
                                    </td>

                                    <td className="px-3 py-3 border font-serif">
                                        <SelectForm
                                            name={`data.couponPayments.${index}.bankAccountTo`}
                                            control={control}
                                            options={bankAccountOption}
                                            error={get(errors, `data.couponPayments.${index}.bankAccountTo.message`)}
                                        />
                                    </td>

                                    <td className="px-3 py-3 border font-serif">
                                        <Controller
                                            name={`data.couponPayments.${index}.cashOrderAmt`}
                                            control={control}
                                            defaultValue={isins.effectiveValueAmt}
                                            render={() => <span>{isins.effectiveValueAmt}</span>}
                                        />
                                    </td>

                                    <td className="px-3 py-3 border font-serif">
                                        <NumberInputForm
                                            control={control}
                                            name={`data.couponPayments.${index}.netPaymentAmount`}
                                            onValueChange={(value) => {
                                                const currentPayments = getValues("data.couponPayments") || []

                                                const nextPayments = currentPayments.map((p: any, i: number) =>
                                                    i === index ? { ...p, netPaymentAmount: value } : p)

                                                const total = nextPayments.reduce(
                                                    (sum: number, p: any) => sum + Number(p.netPaymentAmount || 0), 0)

                                                setValue("data.totalCouponAmount", total, {
                                                    shouldDirty: true,
                                                    shouldTouch: true
                                                })
                                            }}
                                        >
                                        </NumberInputForm>
                                    </td>
                                </tr>
                            ))}</>
                        )}
                    </tbody>
                </table >
            </div>

            <div className="flex py-5 items-center">
                <label className="w-50 mt-1 shrink-0">Total Payment Amount</label>
                {isinCurrency}
                <NumberInputForm
                    name='data.totalCouponAmount'
                    control={control}
                    className="outline-none border-white bg-white shadow-none"
                    disabled
                    error={get(errors, "data.totalCouponAmount.message")}
                >
                </NumberInputForm>
            </div>
            <div className="flex py-5 items-center">
                <label className="w-50 mt-1 shrink-0">Payment Date</label>
                <Controller
                    name="data.paymentDo"
                    control={control}
                    render={({ field }) => {
                        return <DateInput {...field}
                            error={get(errors, "data.paymentDo.message")}
                        />
                    }}
                />
            </div>
            <div className="flex py-5 items-center">
                <label className="w-46 mt-1 shrink-0">Description</label>
                <InputForm
                    name="data.description"
                    control={control}
                    error={get(errors, "data.description.message")}
                >
                </InputForm>
            </div>
        </>}
    </>)
}