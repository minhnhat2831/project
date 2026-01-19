import { create } from "zustand"
import type { searchSettingListItem } from "../schema/SearchSettingSchema.type"

interface SearchSettingStore {
    selectedSearchSetting : searchSettingListItem | null,
    setSelectedSearchSetting: (SearchSetting: searchSettingListItem | null) => void
}

export const useSettingStore = create<SearchSettingStore>((set) =>({
    selectedSearchSetting : null,
    setSelectedSearchSetting: (SearchSetting) => set({ selectedSearchSetting: SearchSetting }),
}))