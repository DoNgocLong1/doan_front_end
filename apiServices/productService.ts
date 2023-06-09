import { IProductImage } from "@/types/productType.type";
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
export const updateProduct = async (formData: any) => {
  const data = await instance
    .post(`update-product`, formData)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const deleteProduct = async (formData: any) => {
  const data = await instance
    .post(`delete-product`, formData)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const updateProductImages = async (formData: IProductImage) => {
  const data = await instance
    .post(`update-product-image`, formData)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const createProductImages = async (formData: IProductImage) => {
  const data = await instance
    .post(`create-product-image`, formData)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const getProductImages = async (page: number) => {
  const data = await instance
    .get(`get-product-image?page=${page}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};

