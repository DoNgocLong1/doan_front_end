import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type Product = {
  name: string;
  image: string;
};

interface IInitialState {
  productData: null | Omit<Product, "image">;
}

const initialState: IInitialState = {
  productData: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },
});
//action
export const { } = productSlice.actions;
// reducer
export default productSlice.reducer;
//state
export const selectAuth = (state: RootState) => state.product;
