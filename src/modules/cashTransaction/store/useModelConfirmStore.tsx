import { create } from "zustand"

type Mode = "form" | "confirm"
interface ModalStoreState {
    type: Mode
    setType: (type: Mode) => void
}

export const useModalConfirmStore = create<ModalStoreState>((set) => ({
    type: "form",
    setType: (type) => set({ type }),
}))