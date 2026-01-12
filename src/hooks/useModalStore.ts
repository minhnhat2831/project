import { create } from "zustand"

type Mode = "create" | "edit" | "delete" 
interface ModalStoreState {
    open: boolean
    setOpen: (value: boolean) => void
    reset: () => void
    typeMode : Mode
    setTypeMode : (typeMode : Mode ) => void
}

export const useModalStore = create<ModalStoreState>((set) => ({
    open: false,
    typeMode : "create",
    setOpen: (open) => set({ open }),
    setTypeMode: (typeMode) => set({ typeMode }),
    reset: () =>
        set({
            open: false,
        }),
}))