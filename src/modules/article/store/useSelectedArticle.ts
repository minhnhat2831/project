import { create } from "zustand"
import type { articleListItem } from "../schema/ArticleScheme.type"


interface SelectedArticle {
    selectedArticle: articleListItem | null,
    setSelectedArticle: (article: articleListItem) => void
}

export const useArticleStore = create<SelectedArticle>((set) => ({
    selectedArticle: null,
    setSelectedArticle: (article) => set(() => ({ selectedArticle: article }))
}))