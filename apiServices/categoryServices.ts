import { instance } from "./instance";
export const fetchCategory = async () => {
  const data = await instance
    .get("get-categories")
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
