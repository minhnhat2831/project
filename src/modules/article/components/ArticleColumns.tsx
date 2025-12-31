import type { ColumnDef } from "@tanstack/react-table";
import type { Article } from "../types/article/Article";
import { useModalStore } from "@/hooks/useModalStore";
import { Icons } from "@/components/common/Icon";
import { useSelectedArticle } from "../store/useSeletedArticle";

export const ArticleColumns: ColumnDef<Article>[] = [
    {
        accessorKey: "id",
        header: "ID"
    },
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "author",
        header: "Author",
    },
    {
        accessorKey: "category.name",
        header: "Category"
    },
    {
        accessorKey: "createdAt",
        header: "Created Date"
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => {
            const status = getValue<string>()

            return (<>
                <div className="flex items-center gap-2">
                    {status === "published" ? (<>
                    <span
                        className={`h-2 w-2 flex items-center rounded-full bg-green-400`}
                    ></span><p>Published</p>
                    </>) : ""}
                    {status === "unpublished" ? (<>
                    <span
                        className={`h-2 w-2 rounded-full bg-gray-400`}
                    ></span><p>Unpublished</p>
                    </>) : "" }
                    {status === "draft" ?  (<>
                    <span
                        className={`h-2 w-2 rounded-full bg-yellow-400`}
                    ></span><p>Draft</p>
                    </>) : ""}
                </div>
            </>

            )
        }
    },
    {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const article = row.original
      const { setOpenEdit, setConfirm} = useModalStore()
      const { setSelectedArticle } = useSelectedArticle()

      const handleEdit = () => {
          setSelectedArticle(article)
          setOpenEdit(true)
      }

      const handleDelete = () => {
          setSelectedArticle(article)
          setConfirm(true)
      }
      
      return (
        <div className="flex gap-3">
          <button onClick={handleEdit}>
            <Icons.Pen className="text-red-400 cursor-pointer" />
          </button>
          <button onClick={handleDelete}>
            <Icons.Trash className="text-gray-600 cursor-pointer" />
          </button>
        </div>
      )
    },
  },
]