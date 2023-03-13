import { fetchProduct, listProduct, minMax } from "apiServices/productService";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { IProductItem } from "types/productType.type";

const useProduct = () => {
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
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
  const productData: IProductItem[] = productQuery.data?.data.data;
  const popularProductData: IProductItem[] = popularProductQuery.data?.data;
  console.log(popularProductQuery);
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
