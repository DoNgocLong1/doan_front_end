import { useRouter } from 'next/router';
const useUrlParams = () => {
  const router = useRouter()
  const pathname = router.pathname;
  console.log(router.query);
  const transmissionParams = (key: string, value: any): void => {
    router.push({
      pathname: pathname,
      query: {
        ...router.query,
        [key]: String(value),
        page: "1",
      },
    }, undefined, { scroll: false });
  };
  const transmissionPages = (key: string, value: any): void => {
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
        page: "1",
      }
    },undefined, { scroll: false });
  };
  return {
    pathname,
    transmissionParams,
    transmissionPages,
    twoKeysTransmissionParams,
  };
};
export default useUrlParams;
