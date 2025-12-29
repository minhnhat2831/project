import { create } from "zustand"
import type { Client } from "../types/client/Client"

interface ClientStore {
    selectedClient? : Client | null,
    setSelectedClient: (Client: Client | null) => void
}

export const useClientStore = create<ClientStore>((set) =>({
    selectedClient : null,

    setSelectedClient: (Client) => set({ selectedClient: Client }),
}))