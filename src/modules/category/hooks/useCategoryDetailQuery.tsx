import { useQuery } from "@tanstack/react-query"
import { GetCategoryDetail } from "../api/api"
import { toast } from "react-toastify"

export const useCategoryDetailQuery = (id? : string) => {
    const query = useQuery({
        queryKey : ['categories', id],
        queryFn : async () => {
            try{
                return await GetCategoryDetail(id)
            }catch(error : any){
                toast.error(error)
            }
        },
        enabled : !!id
    })

    return { 
        data : query.data?.data,
        loading : query.isLoading
    }
}