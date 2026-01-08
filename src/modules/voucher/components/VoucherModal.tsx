import PopupCE from "@/components/common/base/PopupCE";
import { useModalStore } from "@/hooks/useModalStore";
import { useStore } from "@/hooks/useStore";
import Header from "@/layouts/Header";
import { useVoucherStore } from "../store/useSelectedVoucher";
import VoucherCreate from "./VoucherCreate";
import PopupConfirm from "@/components/common/base/PopupComfirm";
import VoucherEdit from "./VoucherEdit";
import Button from "@/components/common/form/Button";

export default function VoucherModal() {
    const { open, setOpen, confirm, setConfirm } = useModalStore()
    const { search, setSearch } = useStore()
    const { selectedVoucher } = useVoucherStore()
    return (<>
        <Header href="/admin/voucher" childrenHref={"Voucher"}
            children={<>
                <Button
                    type="button"
                    variant="create"
                    size="sm"
                    className="mr-8"
                    onClick={() => setOpen(true)}
                >
                    Create
                </Button>

                <PopupCE open={open} onOpenChange={setOpen}>
                    {<VoucherCreate open={open} setOpen={setOpen} />}
                </PopupCE>
            </>}

            searchValue={search} onSearchChange={setSearch}
        />

        <PopupConfirm open={confirm} onOpenChange={setConfirm}>
            {selectedVoucher &&
                <VoucherEdit open={confirm} setOpen={setConfirm} voucher={selectedVoucher} />
            }
        </PopupConfirm>

    </>)
}