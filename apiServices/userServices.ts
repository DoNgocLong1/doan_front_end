import { IUserCreateData } from "@/types/index.type";
import { instance } from "./instance";
export const updateUserProfile = async (userData: any, config: any) => {
  const data = await instance
    .post("update-profile", userData, config)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const changePassword = async (userData: any, config: any) => {
  const data = await instance
    .post("change-pass", userData, config)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const getUser = async (token: any) => {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  const data = await instance
    .get("user/find-user", config)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
export const createUser = async (formData: IUserCreateData) => {

  const data = await instance
    .post("user/create-user", formData)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
};
