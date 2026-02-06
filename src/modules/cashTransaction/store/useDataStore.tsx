import { create } from "zustand"
import type { cashTransactionList } from "../schema/Schema.type"

interface SelectedData {
    selectedData: cashTransactionList  | null,
    setSelectedData: (cashTransaction: cashTransactionList) => void
}

export const useDataStore = create<SelectedData>((set) => ({
    selectedData: null,
    setSelectedData: (cashTransaction) => set(() => ({ selectedData: cashTransaction }))
}))