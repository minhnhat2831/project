import { create } from "zustand"
import type { Voucher } from "../types/Voucher"


interface VoucherStore {
    selectedVoucher? : Voucher | null,
    setSelectedVoucher: (Doula: Voucher | null) => void
}

export const useVoucherStore = create<VoucherStore>((set) =>({
    selectedVoucher : null,
    setSelectedVoucher: (Voucher) => set({ selectedVoucher: Voucher }),
}))