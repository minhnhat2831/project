import { create } from "zustand"
import type { Pd } from "../types/Pd"

interface SelectedPdSession{
    selectedPd: Pd | null,
    setSelectedPd: (pd: Pd | null) => void
}

export const usedPdStore = create<SelectedPdSession>((set) => ({
    selectedPd: null,
    setSelectedPd: (pd) => set(() => ({ selectedPd: pd }))
}))