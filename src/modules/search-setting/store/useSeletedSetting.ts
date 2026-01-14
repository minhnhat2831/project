import { create } from "zustand"
import type { SearchSetting } from "../schema/SearchSettingSchema"

interface SearchSettingStore {
    selectedSearchSetting : SearchSetting | null,
    setSelectedSearchSetting: (SearchSetting: SearchSetting | null) => void
}

export const useSettingStore = create<SearchSettingStore>((set) =>({
    selectedSearchSetting : null,
    setSelectedSearchSetting: (SearchSetting) => set({ selectedSearchSetting: SearchSetting }),
}))