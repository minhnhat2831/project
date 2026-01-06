import Button from "@/components/common/form/Button";
import PopupCE from "@/components/common/base/PopupCE";
import { useModalStore } from "@/hooks/useModalStore";
import Header from "@/layouts/Header";
import CategoryCreate from "./CategoryCreate";
import { useStore } from "@/hooks/useStore";
import { useCategoryStore } from "../store/useSelectedCategory";
import CategoryEdit from "./CategoryEdit";
import CategoryDelete from "./CategoryDelete";
import PopupConfirm from "@/components/common/base/PopupComfirm";

export default function CategoryModal() {
    const { open, setOpen, openEdit, setOpenEdit, confirm, setConfirm } = useModalStore()
    const { search, setSearch } = useStore()
    const { selectedCategory } = useCategoryStore()
    return (<>
        <Header href="/admin/categories" childrenHref={"Categories"} children={
            <>
                <Button
                    variant="create"
                    size="sm"
                    className="mr-4"
                    onClick={() => setOpen(!open)}
                >Create</Button>
                <PopupCE open={open} onOpenChange={setOpen}>
                    <CategoryCreate open={open} setOpen={setOpen} />
                </PopupCE>
            </>
        }
            searchValue={search} onSearchChange={setSearch}
        />

        <PopupCE open={openEdit} onOpenChange={setOpenEdit}>
            {selectedCategory &&
                <CategoryEdit
                    open={openEdit}
                    setOpen={setOpenEdit}
                    category={selectedCategory} />
            }
        </PopupCE>

        <PopupConfirm open={confirm} onOpenChange={setConfirm}>
            {selectedCategory &&
                <CategoryDelete
                    open={confirm}
                    setOpen={setConfirm}
                    category={selectedCategory} />
            }
        </PopupConfirm>
    </>)
}