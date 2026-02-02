//Gửi lên BE
export enum TRANSACTION_TYPE_ENUM {
    DEBIT = "debit",
    CREDIT = "credit"
}

//Hiện thị lên UI
export const TRANSACTION_TYPE_KEY = {
    [TRANSACTION_TYPE_ENUM.DEBIT]: 'Debit',
    [TRANSACTION_TYPE_ENUM.CREDIT]: 'Credit'
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
        label: TRANSACTION_DEBIT_KEY[TRANSACTION_DEBIT_ENUM.DEBIT_OTHER ]
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