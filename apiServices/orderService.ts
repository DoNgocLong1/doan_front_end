import { postOrderType } from "@/types/index.type";
import { instance } from "./instance";
export const postOrder = async (formData: postOrderType, token: string) => {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
  const data = await instance
    .post("order/create-order", formData, config)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
  return data;
}
