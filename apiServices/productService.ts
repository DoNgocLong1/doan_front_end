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
export const popularProduct = async () => {
  const data = await instance
    .get(`products/popular-product`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const getProductDetail = async (id: string) => {
  const data = await instance
    .get(`products/product-detail?id=${id}`)
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
export const createProduct = async (formData: any) => {
  const data = await instance
    .post(`products/create-product`, formData)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
