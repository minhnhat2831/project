import DateInput from "@/components/common/form/DateTimeInput"
import InputForm from "@/components/common/form/InputForm"
import SelectForm from "@/components/common/form/SelectForm"
import { useIsin } from "@/modules/cashTransaction/hooks/useIsin"
import type { bankAccountList, isinsList } from "@/modules/cashTransaction/schema/Schema.type"
import { Controller, get, useFormContext, useWatch } from "react-hook-form"
import { useEffect } from "react"
import NumberInputForm from "@/components/common/form/NumberInputForm"
import { useBankAccount } from "@/modules/cashTransaction/hooks/useBankAccount"

export default function CashTransactionFormCoupon() {
    const { getIsin, getIsinHolding } = useIsin()
    const { data: isinData } = getIsin()
    const { getBankAccounts } = useBankAccount()
    const { data: bankAccountData } = getBankAccounts()
    const { control, formState: { errors }, watch, setValue } = useFormContext()

    const watchIsin = watch("data.isin");
    const { data: isinHoldingData } = getIsinHolding(watchIsin, {
        enabled: !!watchIsin
    });

    const bankAccountOption = bankAccountData?.data.map((bank: bankAccountList) => ({
        value: bank.bankAccountUid,
        label: bank.displayName,
    }))

    //option : gắn vào schema (value và lable)
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
                clientName: item.organizationName,
                organizationNum: null,
                subOrganizationNum: null,
                subAccountNum: null,
                currency: "",
            }))
        )
    }, [isinHoldingData, setValue])

    const watchCouponRate = watch("data.couponPercentageRate")
    const watchCouponPayments = useWatch({
        control,
        name: "data.couponPayments"
    })

    useEffect(() => {
        if (!Array.isArray(watchCouponPayments)) {
            setValue("data.totalCouponAmount", 0)
            return
        }

        const total = watchCouponPayments.reduce(
            (sum, p) => sum + Number(p?.netPaymentAmount || 0), 0
        )

        setValue("data.totalCouponAmount", total, {
            shouldDirty: true,
            shouldTouch: true
        })
    }, [watchCouponPayments, setValue])

    useEffect(() => {
        if (!watchCouponRate || !Array.isArray(watchCouponPayments)) return

        const rate = Number(watchCouponRate) * 0.01

        watchCouponPayments.forEach((p, index) => {
            const net = rate * Number(p.cashOrderAmt || 0)

            setValue(
                `data.couponPayments.${index}.netPaymentAmount`,
                net,
                { shouldDirty: true }
            )
        })
    }, [watchCouponRate])

    return (<>
        <div className="flex py-5 items-center">
            <label className="w-50 mt-1">ISIN</label>
            <SelectForm
                name='data.isin'
                control={control}
                options={isinsOption}
                error={get(errors, "data.isin.message")}
            ></SelectForm>
        </div>
        <div className="flex py-5 items-center">
            <label className="w-50 mr-2 mt-1">Security Name</label>
            {watchIsin
                ? isinData?.data.find(i => i.isin === watchIsin)?.securityName
                : "---"}
        </div>
        <div className="flex py-5 items-center">
            <label className="w-46 mt-1">Coupon Payment Rate</label>
            <InputForm
                name="data.couponPercentageRate"
                type="number"
                control={control}
                error={get(errors, "data.couponPercentageRate.message")}
            >
            </InputForm>
            <p>%</p>
        </div>

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
                                <span>{`${isins.organizationName} / ${isins.subOrganizationName}`}</span>
                            </td>

                            <td className="px-3 py-3 border font-serif">
                                <SelectForm
                                    name={`data.couponPayments.${index}.bankAccountTo`}
                                    control={control}
                                    options={bankAccountOption}
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
                                >
                                </NumberInputForm>

                            </td>
                        </tr>
                    ))}</>
                )}
            </tbody>
        </table >

        <div className="flex py-5 items-center">
            <label className="w-50 mt-1">Total Payment Amount</label>
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
            <label className="w-50 mt-1">Payment Date</label>
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
            <label className="w-46 mt-1">Description</label>
            <InputForm
                name="data.description"
                control={control}
                error={get(errors, "data.description.message")}
            >
            </InputForm>
        </div>
    </>)
}