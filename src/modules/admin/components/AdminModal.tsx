import Button from "@/components/common/form/Button";
import Header from "@/layouts/Header";
import { useModalStore } from "@/hooks/useModalStore";
import { useStore } from "@/hooks/useStore";
import AdminFormModal from "./AdminFormModal";
import AdminDelete from "./AdminDelete";

export default function AdminModal() {
    const { setOpen, setTypeMode, typeMode } = useModalStore()
    const { search, setSearch } = useStore()
    const adminData = localStorage.getItem("admin")
    const admin = adminData ? JSON.parse(adminData) : null

    const renderModal = () => {
        switch (typeMode) {
            case "create":
                return <AdminFormModal type={"create"} />
            case "edit":
                return <AdminFormModal type={"edit"} />
            case "delete":
                return <AdminDelete />
            default:
                return null
        }
    }
    return (<>
        <Header href="/admin" childrenHref="Admin / Admin Manager"
            children={
                <>
                {admin.role == "superAdmin" && (
                    <Button
                        type="button"
                        variant="create"
                        size="sm"
                        className="mr-4"

                        onClick={() => {
                            setTypeMode("create");
                            setOpen(true);
                        }}
                    >
                        Create
                    </Button>
                )}
                </>
            }
            searchValue={search} onSearchChange={setSearch}
        />
        {renderModal()}
    </>)
}