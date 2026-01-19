import { create } from "zustand"
import type { pdListItem } from "../schema/PdSchema.type"

interface SelectedPdSession {
    selectedPd: pdListItem | null,
    setSelectedPd: (pd: pdListItem | null) => void
}

export const usePdStore = create<SelectedPdSession>((set) => ({
    selectedPd: null,
    setSelectedPd: (pd) => set(() => ({ selectedPd: pd }))
}))