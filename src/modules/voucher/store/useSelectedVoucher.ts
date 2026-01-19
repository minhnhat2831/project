import { create } from "zustand"
import type { voucherListItem } from "../schema/VoucherSchema.type"

interface VoucherStore {
    selectedVoucher : voucherListItem | null,
    setSelectedVoucher: (Doula: voucherListItem | null) => void
}

export const useVoucherStore = create<VoucherStore>((set) =>({
    selectedVoucher : null,
    setSelectedVoucher: (Voucher) => set({ selectedVoucher: Voucher }),
}))