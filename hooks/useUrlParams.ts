import { useRouter } from 'next/router';
const useUrlParams = () => {
  const router = useRouter()
  const pathname = router.pathname;
  console.log(router.query);
  const transmissionParams = (key: string, value: any): void => {
    router.push({
      pathname,
      query: {
        ...router.query,
        [key]: String(value),
      }
    });
  };
  const twoKeysTransmissionParams = (
    key1: string,
    value1: any,
    key2: string,
    value2: string
  ): void => {
    router.push({
      pathname,
      query: {
        ...router.query,
        [key1]: String(value1),
        [key2]: String(value2),
      }
    });
  };
  return {
    pathname,
    transmissionParams,
    twoKeysTransmissionParams,
  };
};
export default useUrlParams;
