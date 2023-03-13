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
