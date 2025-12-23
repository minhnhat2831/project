import { create } from "zustand"
import type { PaginationState, OnChangeFn } from "@tanstack/react-table"

interface PaginationStore extends PaginationState {
  setPagination: OnChangeFn<PaginationState>
}

export const usePaginationStore = create<PaginationStore>((set) => ({
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
}))
