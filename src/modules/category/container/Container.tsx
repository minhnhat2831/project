import CategoryModal from "../components/CategoryModal";

export default function Container({ children }: React.PropsWithChildren) {
    return (<>
        <CategoryModal />
        {children}
    </>)
}