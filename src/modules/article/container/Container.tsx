import ArticleModal from "../components/ArticleModal"

export const Container = ({children} : React.PropsWithChildren) => {
    return (<>
        <ArticleModal />
        {children}
    </>
    )
}