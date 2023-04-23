import { getUser } from "@/apiServices/userServices";
import { useQuery } from "react-query";
const useUser = () => {
  let token: string = ''
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token') || '';
  }
  const categoryQuery = useQuery({
    queryKey: ["listCategory"],
    queryFn: () => getUser(token),
  });
  return {
    userData: categoryQuery?.data?.data || {}
  }
}
export default useUser
