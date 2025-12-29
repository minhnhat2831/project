import { create } from "zustand"

interface refetch {
    refetch?: () => void
    setRefetch: (fn: () => void) => void
}

export const useRefetchData = create<refetch>((set) => (
{
    refetch: undefined,
    setRefetch: (fn) => set({ refetch: fn })
}))