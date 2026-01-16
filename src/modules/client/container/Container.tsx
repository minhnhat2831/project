import ClientModal from "../components/ClientModal"

export const Container = ({ children }: React.PropsWithChildren) => {
    return (<>
        <ClientModal />
        {children}
    </>
    )
}