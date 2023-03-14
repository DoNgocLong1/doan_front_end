import { fetchProduct, listProduct, minMax } from "@/apiServices/productService";
import { IProductItem } from "@/types/productType.type";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const useProduct = () => {
  const router = useRouter()
  const params = router.query;
  const productQuery = useQuery({
    queryKey: ["product", params],
    queryFn: () => fetchProduct(params || ""),
  });
  const minMaxQuery = useQuery({
    queryKey: ["minmax"],
    queryFn: minMax,
  });
  const popularProductQuery = useQuery({
    queryKey: ["popularProduct"],
    queryFn: listProduct,
  });
  const minPrice = minMaxQuery.data?.data.data.min;
  const maxPrice = minMaxQuery.data?.data.data.max;
  const productData: any[] = productQuery.data?.data.data;
  const popularProductData: IProductItem[] = popularProductQuery.data?.data;
  const totalItem = productQuery.data?.data.total;
  const itemPerPage = productQuery.data?.data.perPage;
  return {
    productQuery,
    minPrice,
    maxPrice,
    productData,
    popularProductData,
    totalItem,
    itemPerPage,
  };
};
export default useProduct;
