import { create } from "zustand"
import type { Client } from "../schema/ClientSchema"

interface ClientStore {
    selectedClient: Client | null,
    setSelectedClient: (Client: Client) => void
}

export const useClientStore = create<ClientStore>((set) => ({
    selectedClient: null,
    setSelectedClient: (Client) => set({ selectedClient: Client }),
}))