import Button from "@/components/common/form/Button";
import { useModalStore } from "@/hooks/useModalStore";
import Header from "@/layouts/Header";
import { useStore } from "@/hooks/useStore";
import CategoryFormModal from "./CategoryFormModal";
import CategoryDelete from "./CategoryDelete";

export default function CategoryModal() {
    const { setOpen, typeMode, setTypeMode } = useModalStore()
    const { search, setSearch } = useStore()

    const renderModal = () => {
        switch (typeMode) {
            case "create":
                return <CategoryFormModal type={"create"} />
            case "edit":
                return <CategoryFormModal type={"edit"} />
            case "delete":
                return <CategoryDelete />
            default:
                return null
        }
    }
    return (<>
        <Header href="/admin/categories" childrenHref={"Categories"} children={
            <>
                <Button
                    type="button"
                    variant="create"
                    size="sm"
                    className="mr-8"
                    onClick={() => {
                        setTypeMode("create")
                        setOpen(true)
                    }}
                >
                    Create
                </Button>
            </>
        }
            searchValue={search} onSearchChange={setSearch}
        />
        {renderModal()}
    </>)
}