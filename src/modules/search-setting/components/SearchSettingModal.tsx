import Button from "@/components/common/form/Button";
import { useModalStore } from "@/hooks/useModalStore";
import Header from "@/layouts/Header";
import SearchSettingDelete from "./SearchSettingDelete";
import SearchSettingFormModal from "./SearchSettingFormModal";

export default function SearchSettingModal() {
    const { open, setOpen, typeMode, setTypeMode } = useModalStore()

    const renderModal = () => {
        switch (typeMode) {
            case "create":
                return <SearchSettingFormModal type={"create"} />
            case "edit":
                return <SearchSettingFormModal type={"edit"} />
            case "delete":
                return <SearchSettingDelete />
            default:
                return null
        }
    }
    return (<>
        <Header href="/admin/search-settings" childrenHref={"Search Setting"}
            children={
                <>
                    <Button
                        variant="create"
                        size="sm"
                        className="mr-4"
                        onClick={() => {
                            setTypeMode("create")
                            setOpen(!open)
                        }}
                    >
                        Create
                    </Button>
                </>
            }
        />
        {renderModal()}
    </>)
}