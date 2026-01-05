import VoucherModal from "../components/VoucherModal";

export const Container = ({children} : React.PropsWithChildren) => {
    return (<>
        <VoucherModal />
        {children}
    </>
    )
}