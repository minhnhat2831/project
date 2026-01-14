import { create } from "zustand"
import type { Doula } from "../schema/DoulaSchema"

interface DoulaStore {
    selectedDoula? : Doula | null,
    setSelectedDoula: (Doula: Doula | null) => void
}

export const useDoulaStore = create<DoulaStore>((set) =>({
    selectedDoula : null,
    setSelectedDoula: (Doula) => set({ selectedDoula: Doula }),
}))