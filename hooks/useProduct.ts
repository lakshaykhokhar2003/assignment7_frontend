import {useQuery} from "@tanstack/react-query";
import {getAllProducts} from "@/actions/productActions";

const useProduct = () => {
    const {data: products,isLoading} = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
        staleTime: Infinity,
        enabled: true,
    });

    return {products,isLoading}
}
export default useProduct
