import { create } from "zustand"
import type { Article } from "../types/article/Article"

interface SelectedArticle {
    selectedArticle: Article | null,
    setSelectedArticle: (article: Article | null) => void
}

export const useArticleStore = create<SelectedArticle>((set) => ({
    selectedArticle: null,
    setSelectedArticle: (article) => set(() => ({ selectedArticle: article }))
}))