import { create } from "zustand"
import type { AdminDoula } from "../types/admin-doula/AdminDoula"

interface DoulaStore {
    selectedDoula? : AdminDoula | null,
    setSelectedDoula: (Doula: AdminDoula | null) => void
}

export const useDoulaStore = create<DoulaStore>((set) =>({
    selectedDoula : null,
    setSelectedDoula: (Doula) => set({ selectedDoula: Doula }),
}))