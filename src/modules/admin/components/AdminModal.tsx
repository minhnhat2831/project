import Button from "@/components/common/form/baseForm/Button";
import Header from "@/layouts/Header";
import { useModalStore } from "@/hooks/useModalStore";
import AdminDelete from "./AdminDelete";
import AdminFormModal from "./AdminFormModal";

export default function AdminModal() {
    const { setOpen, setTypeMode, typeMode } = useModalStore()
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
        />
        {renderModal()}
    </>)
}