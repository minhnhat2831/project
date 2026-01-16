import VoucherModal from "../components/modal/VoucherModal";

export const Container = ({children} : React.PropsWithChildren) => {
    return (<>
        <VoucherModal />
        {children}
    </>
    )
}