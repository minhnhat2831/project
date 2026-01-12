import { create } from "zustand"

interface PasswordStoreState {
    openPassword: boolean
    setOpenPassword: (value: boolean) => void
}

export const usePasswordStore = create<PasswordStoreState>((set) => ({
    openPassword: false,
    setOpenPassword: (openPassword) => set({ openPassword }),
    reset: () =>
        set({
            openPassword: false,
        }),

}))