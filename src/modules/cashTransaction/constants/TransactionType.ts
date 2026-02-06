//Gửi lên BE
export enum TRANSACTION_TYPE_ENUM {
    DEBIT = "debit",
    CREDIT = "credit",
    DEPOSIT = 'deposit',
    COUPON_PAYMENT = 'coupon-payment'
}

//Hiện thị lên UI
export const TRANSACTION_TYPE_KEY = {
    [TRANSACTION_TYPE_ENUM.DEBIT]: 'Debit',
    [TRANSACTION_TYPE_ENUM.CREDIT]: 'Credit',
    [TRANSACTION_TYPE_ENUM.DEPOSIT] : 'Deposit',
    [TRANSACTION_TYPE_ENUM.COUPON_PAYMENT] : 'Coupon Payment'
}

export enum TRANSACTION_DEBIT_ENUM {
    FEES = 'fees',
    TAX_WITHHOLDING = 'tax-withholding',
    WITHDRAWAL = 'withdrawal',
    DEBIT_OTHER = 'debit-others'
}

export const TRANSACTION_DEBIT_KEY = {
    [TRANSACTION_DEBIT_ENUM.FEES]: 'Fees',
    [TRANSACTION_DEBIT_ENUM.TAX_WITHHOLDING]: 'TaxWithholding',
    [TRANSACTION_DEBIT_ENUM.WITHDRAWAL]: 'Withdrawal',
    [TRANSACTION_DEBIT_ENUM.DEBIT_OTHER]: 'Debit (Others)'
}

export enum TRANSACTION_CREDIT_ENUM {
    COUPON_PAYMENT = 'coupon-payment',
    DEPOSIT = 'deposit',
    CREDIT_OTHER = 'credit-others'
}

export const TRANSACTION_CREDIT_KEY = {
    [TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT]: 'Coupon Payment',
    [TRANSACTION_CREDIT_ENUM.DEPOSIT]: 'Deposit',
    [TRANSACTION_CREDIT_ENUM.CREDIT_OTHER]: 'Credit (Others)',
}

export const transactionTypeDebit = [
    {
        value: TRANSACTION_DEBIT_ENUM.FEES,
        label: TRANSACTION_DEBIT_KEY[TRANSACTION_DEBIT_ENUM.FEES]
    },
    {
        value: TRANSACTION_DEBIT_ENUM.TAX_WITHHOLDING,
        label: TRANSACTION_DEBIT_KEY[TRANSACTION_DEBIT_ENUM.TAX_WITHHOLDING]
    },
    {
        value: TRANSACTION_DEBIT_ENUM.WITHDRAWAL,
        label: TRANSACTION_DEBIT_KEY[TRANSACTION_DEBIT_ENUM.WITHDRAWAL]
    },
    {
        value: TRANSACTION_DEBIT_ENUM.DEBIT_OTHER,
        label: TRANSACTION_DEBIT_KEY[TRANSACTION_DEBIT_ENUM.DEBIT_OTHER]
    },
]

export const transactionTypeCredit = [
    {
        value: TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT,
        label: TRANSACTION_CREDIT_KEY[TRANSACTION_CREDIT_ENUM.COUPON_PAYMENT]
    },
    {
        value: TRANSACTION_CREDIT_ENUM.DEPOSIT,
        label: TRANSACTION_CREDIT_KEY[TRANSACTION_CREDIT_ENUM.DEPOSIT]
    },
    {
        value: TRANSACTION_CREDIT_ENUM.CREDIT_OTHER,
        label: TRANSACTION_CREDIT_KEY[TRANSACTION_CREDIT_ENUM.CREDIT_OTHER]
    },
]

export const TRANSACTION_TYPE_LABEL_MAP: Record<string, string> = {
    // Debit
    fees: 'Fees',
    'tax-withholding': 'Tax Withholding',
    withdrawal: 'Withdrawal',
    'debit-others': 'Debit (Others)',
    debit : 'Debit',

    // Credit
    credit : 'Credit',
    'coupon-payment': 'Coupon Payment',
    deposit: 'Deposit',
    'credit-others': 'Credit (Others)',
}

export enum TRANSACTION_STATUS_ENUM {
    PENDINGMAKER = 'pending-maker',
    DRAFT = 'draft',
    COMPLETE = 'complete',
    PENDING = 'pending'
}

export const TRANSACTION_STATUS_key = {
    [TRANSACTION_STATUS_ENUM.PENDINGMAKER] : 'Pending Maker',
    [TRANSACTION_STATUS_ENUM.DRAFT] : 'Draft',
    [TRANSACTION_STATUS_ENUM.COMPLETE] : 'Complete',
    [TRANSACTION_STATUS_ENUM.PENDING] : 'Pending'
}