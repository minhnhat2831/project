import Button from "@/components/common/form/Button";
import PopupCE from "@/components/common/PopupCE";
import { useModalStore } from "@/hooks/useModalStore";
import Header from "@/layouts/Header";
import SearchSettingCreate from "./SearchSettingCreate";
import { useStore } from "@/hooks/useStore";
import { useSettingStore } from "../store/useSeletedSetting";
import SearchSettingEdit from "./SearchSettingEdit";
import PopupConfirm from "@/components/common/PopupComfirm";
import SearchSettingDelete from "./SearchSettingDelete";

export default function SearchSettingModal(){
    const { open, setOpen, openEdit, setOpenEdit, confirm, setConfirm } = useModalStore()
    const { search, setSearch } = useStore()
    const { selectedSearchSetting } = useSettingStore()
    return(<>
        <Header href="/admin/search-settings" childrenHref={"Search Setting"} 
        children={
            <>
            <Button
                variant="create"
                size="lg"
                className="mr-4"
                onClick={() => setOpen(!open)}
            >
                Create
            </Button>
            <PopupCE open={open} onOpenChange={setOpen}>
                <SearchSettingCreate open={open} setOpen={setOpen} />
            </PopupCE>
            </>
        }
        searchValue={search} onSearchChange={setSearch}
        />

        <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
            {selectedSearchSetting && 
                <SearchSettingEdit 
                    open={openEdit} 
                    setOpen={setOpenEdit} 
                    keyword={selectedSearchSetting} 
                />}
        </PopupCE>

        <PopupConfirm open={confirm} onOpenChange={setConfirm}>
            {selectedSearchSetting && 
                <SearchSettingDelete
                    open={confirm} 
                    setOpen={setConfirm} 
                    keyword={selectedSearchSetting} 
                />}
        </PopupConfirm>
    </>)
}