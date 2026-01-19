import { create } from "zustand"
import type { adminListItem } from "../schema/AdminUserSchema.type"

interface AdminStore {
    selectedAdmin: adminListItem | null,
    setSelectedAdmin: (admin: adminListItem) => void
}

export const useAdminStore = create<AdminStore>((set) => ({
    selectedAdmin: null,
    setSelectedAdmin: (admin) => set({ selectedAdmin: admin }),
}))

