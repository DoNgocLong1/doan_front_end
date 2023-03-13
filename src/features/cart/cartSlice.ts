import { RootState } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartList } from "types/cartType.type";
interface IInitialState {
  cartList: ICartList[];
  listLength: number;
  totalPrice: number;
}
const initialState: IInitialState = {
  cartList: [],
  listLength: 0,
  totalPrice: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state: IInitialState, action: PayloadAction<ICartList>) {
      const existingItem: any = state.cartList.find((cart: ICartList) => {
        return cart.id === action.payload.id;
      });
      if (!existingItem) {
        const newItem = {
          ...action.payload,
          count: 1,
          total: action.payload.price,
        };
        state.cartList = [newItem, ...state.cartList];
      } else {
        existingItem.count++;
        existingItem.total += action.payload.price;
      }
      state.totalPrice += action.payload.price;
      state.listLength++;
    },
    removeItem(state: IInitialState, action: PayloadAction<ICartList>) {
      const removeItem: any = state.cartList.find((cart: ICartList) => {
        return cart.id === action.payload.id;
      });
      state.cartList.splice(state.cartList.indexOf(removeItem), 1);
      state.totalPrice -= removeItem.total;
      state.listLength -= removeItem.count;
    },
    decreaseItem(state: IInitialState, action: PayloadAction<ICartList>) {
      const existingItem: any = state.cartList.find((cart: ICartList) => {
        return cart.id === action.payload.id;
      });
      if (existingItem.count === 0) {
        state.cartList.splice(state.cartList.indexOf(existingItem), 1);
      }
      existingItem.count--;
      existingItem.total -= action.payload.price;
      state.listLength--;
      state.totalPrice -= existingItem.price;
    },
  },
});
//action
export const { addItem, removeItem, decreaseItem } = cartSlice.actions;
// reducer
export default cartSlice.reducer;
//state
export const selectCartList = (state: RootState) => state.cart;
