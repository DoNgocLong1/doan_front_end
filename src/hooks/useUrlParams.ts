import {
  useLocation,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
const useUrlParams = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const params = Object.fromEntries([...searchParams]);
  const transmissionParams = (key: string, value: any): void => {
    navigate({
      pathname,
      search: createSearchParams({
        ...params,
        [key]: String(value),
      }).toString(),
    });
  };
  const twoKeysTransmissionParams = (
    key1: string,
    value1: any,
    key2: string,
    value2: string
  ): void => {
    navigate({
      pathname,
      search: createSearchParams({
        ...params,
        [key1]: String(value1),
        [key2]: String(value2),
      }).toString(),
    });
  };
  return {
    pathname,
    transmissionParams,
    twoKeysTransmissionParams,
  };
};
export default useUrlParams;
