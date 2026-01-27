import { create } from "zustand"

interface ModalStoreState {
    open: boolean
    setOpen: (value: boolean) => void
    reset: () => void
}

export const useOpenStoreStore = create<ModalStoreState>((set) => ({
    open: true,
    setOpen: (open) => set({ open }),
    reset: () =>
        set({
            open: false,
        }),
}))