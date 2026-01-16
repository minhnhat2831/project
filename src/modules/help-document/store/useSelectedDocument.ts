import { create } from "zustand"
import type { HelpDocument } from "../schema/HelpDocumentSchema"

interface HelpDocumentStore {
    selectedDocument : HelpDocument | null,
    setSelectedDocument: (HelpDocument: HelpDocument | null) => void
}

export const useDocumentStore = create<HelpDocumentStore>((set) =>({
    selectedDocument : null,
    setSelectedDocument: (HelpDocument) => set({ selectedDocument: HelpDocument }),
}))