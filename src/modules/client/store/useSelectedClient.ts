import { create } from "zustand"
import type { clientListItem } from "../schema/ClientSchema.type"

interface ClientStore {
    selectedClient: clientListItem | null,
    setSelectedClient: (Client: clientListItem) => void
}

export const useClientStore = create<ClientStore>((set) => ({
    selectedClient: null,
    setSelectedClient: (Client) => set({ selectedClient: Client }),
}))