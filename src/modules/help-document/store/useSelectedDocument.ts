import { create } from "zustand"
import type { helpDocumentListItem } from "../schema/HelpDocumentSchema.type"

interface HelpDocumentStore {
    selectedDocument : helpDocumentListItem | null,
    setSelectedDocument: (HelpDocument: helpDocumentListItem | null) => void
}

export const useDocumentStore = create<HelpDocumentStore>((set) =>({
    selectedDocument : null,
    setSelectedDocument: (HelpDocument) => set({ selectedDocument: HelpDocument }),
}))