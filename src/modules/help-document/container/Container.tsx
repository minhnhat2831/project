import HelpDocumentModal from "../components/HelpDocumentModal"

export const Container = ({children} : React.PropsWithChildren) => {
    return (<>
        <HelpDocumentModal />
        {children}
    </>
    )
}