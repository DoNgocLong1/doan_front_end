
import { fetchCategory } from "@/apiServices/categoryServices";
import { IdataCategory } from "@/types/productType.type";
import { useQuery } from "react-query";
const useCategory = () => {
  const categoryQuery = useQuery({
    queryKey: ["listCategory"],
    queryFn: fetchCategory,
  });
  const categoryData: IdataCategory[] = categoryQuery.data?.data.data;
  return {
    categoryData,
  };
};
export default useCategory;
