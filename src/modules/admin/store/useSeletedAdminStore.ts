import { create } from "zustand"
import type { Admin } from "../types/Admin"

interface AdminStore {
    selectedAdmin? : Admin | null,
    setSelectedAdmin: (admin?: Admin | null) => void
}

export const useAdminStore = create<AdminStore>((set) =>({
    selectedAdmin : null,
    setSelectedAdmin: (admin) => set({ selectedAdmin: admin }),
}))

