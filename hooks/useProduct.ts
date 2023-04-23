import { popularProduct } from './../apiServices/productService';
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
    queryFn: popularProduct,
  });
  const minPrice: number = minMaxQuery.data?.data.data.min;
  const maxPrice: number = minMaxQuery.data?.data.data.max;
  const productData: IProductItem[] = productQuery.data?.data.data.rows;
  const popularProductData: IProductItem[] = popularProductQuery.data?.data;
  const totalItem: number = productQuery.data?.data.total;
  const itemPerPage: number = productQuery.data?.data.perPage;

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
