import { IUserCreateData, IUserData } from "@/types/index.type";
import { instance } from "./instance";
import { IUser } from "@/types/userType.type";
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
export const updateUser = async (formData: IUserData, token: string) => {
  const data = await instance
    .post("user/update-user", formData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      }
    })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
}
export const getAllUser = async () => {
  const data = await instance
    .get("user/all-user")
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
}
export const getUserById = async (id: number) => {
  const data = await instance
    .get(`user?id=${id}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
}
export const updateUserById = async (formData: IUser) => {
  const data = await instance
    .post('user/update', formData)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
}
export const deleteUserById = async (id: number) => {
  const data = await instance
    .patch('user/delete', {id})
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
}
