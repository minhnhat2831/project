import MuiPagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import { type Table } from "@tanstack/react-table"

interface Props<T> {
    table: Table<T>
    totalCount?: number
}

const PAGE_SIZES = [25, 50, 100]

export default function TablePagination<T>({ table, totalCount = 0, }: Props<T>) {
    const { pageIndex, pageSize } = table.getState().pagination
    const from = totalCount === 0 ? 0 : pageIndex * pageSize + 1
    const to = Math.min((pageIndex + 1) * pageSize, totalCount)

    return (<>
    <div className="w-full flex justify-between">
        <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-600">
            <div>
                Showing <strong>{from}</strong> to <strong>{to}</strong> of{" "}
                <strong>{totalCount}</strong> entries
            </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
                <span className="text-sm font-bold">Per page</span>
                <select
                    value={pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value))
                        table.setPageIndex(0)
                    }}
                    className="border rounded px-2 py-1"
                >
                    {PAGE_SIZES.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
        
        <Stack spacing={2} alignItems="center" className="py-4">
            <MuiPagination
                count={table.getPageCount()}
                page={pageIndex + 1}
                onChange={(_, page) => table.setPageIndex(page - 1)}
                color="primary"
                showFirstButton
                showLastButton
            />
        </Stack>
</div>
    </div>
    </>
    )
}
