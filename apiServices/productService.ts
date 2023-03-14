import { instance } from "./instance";
export const fetchProduct = async (params: any = "") => {
  const data = await instance
    .get(`products/filter`, { params: params })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const listProduct = async () => {
  const data = await instance
    .get("products/get-all-products")
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const productDetail = async (id: number) => {
  const data = await instance
    .get(`product/${id}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const minMax = async () => {
  const data = await instance
    .get(`data-price`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
