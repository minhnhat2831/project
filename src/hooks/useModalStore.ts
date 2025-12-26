import { create } from "zustand"

interface ModalStoreState {
    open: boolean
    openEdit: boolean
    confirm: boolean
    
    setOpen: (value: boolean) => void
    setOpenEdit: (value: boolean) => void
    setConfirm: (value: boolean) => void

    reset: () => void
}

export const useModalStore = create<ModalStoreState>((set) => ({
    open: false,
    openEdit: false,
    confirm: false,

    setOpen: (open) => set({ open }),
    setOpenEdit: (openEdit) => set({ openEdit }),
    setConfirm: (confirm) => set({ confirm }),

    reset: () =>
        set({
            open: false,
            openEdit: false,
            confirm: false,
        }),

}))