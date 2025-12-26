import { create } from "zustand"
import type { PaginationState, OnChangeFn } from "@tanstack/react-table"

interface Store extends PaginationState {
  setPagination?: OnChangeFn<PaginationState>
  search?: string
  setSearch?: (value: string) => void
}

export const useStore  = create<Store>((set) => ({
    pageIndex: 0,
    pageSize: 25,
    setPagination: (pagination) =>
      set((state) => {
        if (typeof pagination === "function") {
          const newState = pagination({
            pageIndex: state.pageIndex,
            pageSize: state.pageSize,
          })
          return newState
        }
        return pagination
      }),

    search: undefined,
    setSearch: (value) =>
      set({
        search: value.trim() ? value : undefined,
      }),
  }))

