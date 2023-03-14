
import { fetchCategory } from "@/apiServices/categoryServices";
import { IdataCategory } from "@/types/productType.type";
import { useQuery } from "react-query";
const useCategory = () => {
  const categoryQuery = useQuery({
    queryKey: ["listCategory"],
    queryFn: fetchCategory,
  });
  const data: IdataCategory[] = categoryQuery.data?.data.data;
  return data;
};
export default useCategory;
