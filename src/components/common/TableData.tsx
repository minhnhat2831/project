import LoadingSpinner from "./Loading";
import { flexRender, type Table } from "@tanstack/react-table"

interface Iprops<T> {
    loading: boolean,
    pagination: React.ReactNode,
    table: Table<T>
}

export default function TableData<T>({ loading, pagination, table }: Iprops<T>) {

    return (<>
        {loading ? <div><LoadingSpinner /></div> : <>
            <div className="overflow-x-auto px-4 py-4 border-gray-300 rounded-sm max-h-[calc(100vh-140px)] overflow-y-auto">
                <table className="w-full text-sm">
                    <thead className="sticky -top-8 z-20 border bg-white">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="border-b-2">
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        className="px-3 py-4 text-left font-semibold border whitespace-nowrap"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>  
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="border-b">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-3 py-3 border font-serif">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
            <div className="flex items-center">
                {pagination}
            </div></>
        }
    </>)
}