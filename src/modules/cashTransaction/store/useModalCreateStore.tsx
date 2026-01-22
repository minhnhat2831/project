import { create } from "zustand"

type Mode = "Debit" | "Credit"
interface ModalStoreState {
    open: boolean
    setOpen: (value: boolean) => void
    reset: () => void
    typeMode: Mode
    setTypeMode: (typeMode: Mode) => void
}

export const useModalCreateStore = create<ModalStoreState>((set) => ({
    open: false,
    typeMode: "Debit",
    setOpen: (open) => set({ open }),
    setTypeMode: (typeMode) => set({ typeMode }),
    reset: () =>
        set({
            open: false,
        }),
}))