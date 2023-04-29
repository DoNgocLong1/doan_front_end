import { IdataCategory } from './../types/productType.type';
import { ICategory } from './../types/index.type';
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

export const createCategory = async (formData: ICategory) => {
  const data = await instance
    .post("create-category", formData)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const deleteCategory = async (id: number) => {
  const data = await instance
    .post("delete-category", { id })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};

export const getCategory = async (id: number) => {
  const data = await instance
    .post("edit-category", { id })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const updateCategory = async (formData: IdataCategory) => {
  const data = await instance
    .post("update-category", formData)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};

