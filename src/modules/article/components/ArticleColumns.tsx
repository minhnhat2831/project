import type { ColumnDef } from "@tanstack/react-table";
import type { Article } from "../types/article/Article";
import { useModalStore } from "@/hooks/useModalStore";
import { Icons } from "@/components/common/Icon";
import { useArticleStore } from "../store/useSeletedArticle";
import { SortHeader } from "@/components/common/SortHeader";

export const ArticleColumns: ColumnDef<Article>[] = [
    {
        accessorKey: "id",
        header: () => <SortHeader columnKey="id" title="ID" />,
    },
    {
        accessorKey: "title",
        header: () => <SortHeader columnKey="title" title="Title" />,
    },
    {
        accessorKey: "author",
        header: () => <SortHeader columnKey="author" title="Author" />,
    },
    {
        accessorKey: "category.name",
        header: () => <SortHeader columnKey="category.name" title="Category" />,
    },
    {
        accessorKey: "createdAt",
        header: () => <SortHeader columnKey="createdAt" title="Created Date" />,
    },
    {
        accessorKey: "status",
        header: () => <SortHeader columnKey="status" title="Status" />,
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
      const { setSelectedArticle } = useArticleStore()

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