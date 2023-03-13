import { fetchCategory } from "apiServices/categoryServices";
import { useQuery } from "react-query";
import { IdataCategory } from "types/productType.type";
const useCategory = () => {
  const categoryQuery = useQuery({
    queryKey: ["listCategory"],
    queryFn: fetchCategory,
  });
  const data: IdataCategory[] = categoryQuery.data?.data.data;
  return data;
};
export default useCategory;
