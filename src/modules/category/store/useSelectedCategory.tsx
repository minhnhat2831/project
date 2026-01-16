import { create } from "zustand"
import type { Category } from "../schema/CategorySchema"

interface SelectedCategory {
    selectedCategory: Category | null,
    setSelectedCategory: (category: Category | null) => void
}

export const useCategoryStore = create<SelectedCategory>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (category) => set(() => ({ selectedCategory: category }))
}))