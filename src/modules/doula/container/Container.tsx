import DoulaModal from "../components/model/DoulaModal"

export const Container = ({children} : React.PropsWithChildren) => {
    return (<>
        <DoulaModal />
        {children}
    </>
    )
}