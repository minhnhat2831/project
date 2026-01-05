import { create } from "zustand"
import type { Category } from "../types/Category"

interface SelectedCategory{
    selectedCategory: Category | null,
    setSelectedCategory : (category : Category | null) => void
}

export const useSelectedCategory = create<SelectedCategory>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (category) => set(() => ({ selectedCategory: category }))
}))