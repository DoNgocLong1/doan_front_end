import { RootState } from "@/app/store";
import { ICartList } from "@/types/cartType.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        existingItem.total += +action.payload.price;
      }
      state.totalPrice += +action.payload.price;
      state.listLength++;
    },
    removeItem(state: IInitialState, action: PayloadAction<ICartList>) {
      const removeItem: any = state.cartList.find((cart: ICartList) => {
        return cart.id === action.payload.id;
      });
      state.cartList.splice(state.cartList.indexOf(removeItem), 1);
      state.totalPrice -= +removeItem.total;
      state.listLength -= removeItem.count;
    },
    decreaseItem(state: IInitialState, action: PayloadAction<ICartList>) {
      const existingItem: any = state.cartList.find((cart: ICartList) => {
        return cart.id === action.payload.id;
      });
      if (existingItem.count === 1) {
        state.cartList.splice(state.cartList.indexOf(existingItem), 1);
      }
      existingItem.count--;
      existingItem.total -= +action.payload.price;
      state.listLength--;
      state.totalPrice -= existingItem.price;
    },
    removeAllItem(state: IInitialState) {
      state.cartList = []
      state.listLength = 0
      state.totalPrice = 0
    },
    AddAllItem(state: IInitialState, action: PayloadAction<any>) {
      const listLength = action.payload.reduce((count: number, item: any) => {
        return count += item.count
      }, 0)
      const amount = action.payload.reduce((total: number, item: any) => {
        return total += (item.count * item.price)
      }, 0)
      state.totalPrice = amount
      state.listLength = listLength
      state.cartList = [...action.payload]
    },
  },
});
//action
export const { addItem, removeItem, decreaseItem, removeAllItem, AddAllItem } = cartSlice.actions;
// reducer
export default cartSlice.reducer;
//state
export const selectCartList = (state: RootState) => state.cart;
