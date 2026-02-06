import { create } from "zustand"

type Type = "Create" | "View"
interface ModalStoreState {
    open: boolean
    setOpen: (value: boolean) => void
    reset: () => void
    typeOpen: Type
    setTypeOpen:(typeOpen: Type) => void
}

export const useModalTypeStore = create<ModalStoreState>((set) => ({
    open: true,
    typeOpen: "Create",
    setOpen: (open) => set({ open }),
    setTypeOpen: (typeOpen) => set({ typeOpen }),
    reset: () =>
        set({
            open: false,
        }),
}))