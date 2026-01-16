import DoulaModal from "../components/modal/DoulaModal"

export const Container = ({ children }: React.PropsWithChildren) => {
    return (<>
        <DoulaModal />
        {children}
    </>
    )
}