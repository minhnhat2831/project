import LoadingSpinner from "./Loading";

interface Iprops {
    childrenHeader: React.ReactNode,
    childrenRow: React.ReactNode,
    loading: boolean,
    pagination: React.ReactNode,
}

export default function TableData({ childrenHeader, childrenRow, loading, pagination }: Iprops) {
    return (<>
        {loading ? <div><LoadingSpinner /></div> : <>
            <div className="overflow-x-auto px-1 py-1 border-gray-300 rounded-sm max-h-[calc(100vh-110px)] overflow-y-auto">
                <table className="w-full text-sm">
                    <thead className="sticky -top-2 z-20 bg-white">
                        {childrenHeader}
                    </thead>
                    <tbody>
                        {childrenRow}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center gap-4 mt-4">
                {pagination}
            </div></>
        }
    </>)
}