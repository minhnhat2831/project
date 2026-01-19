import { create } from "zustand"
import type { doulaListItem } from "../schema/types/DoulaSchema.type"

interface DoulaStore {
    selectedDoula : doulaListItem | null,
    setSelectedDoula: (Doula: doulaListItem) => void
}

export const useDoulaStore = create<DoulaStore>((set) =>({
    selectedDoula : null,
    setSelectedDoula: (Doula) => set({ selectedDoula: Doula }),
}))