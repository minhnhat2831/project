import { create } from "zustand"
import type { categoryListItem } from "../schema/CategorySchema.type"

interface SelectedCategory {
    selectedCategory: categoryListItem | null,
    setSelectedCategory: (category: categoryListItem | null) => void
}

export const useCategoryStore = create<SelectedCategory>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (category) => set(() => ({ selectedCategory: category }))
}))