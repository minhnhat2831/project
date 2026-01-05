import PdModal from "../components/PdModal"

export const Container = ({children} : React.PropsWithChildren) => {
    return (<>
        <PdModal />
        {children}
    </>
    )
}