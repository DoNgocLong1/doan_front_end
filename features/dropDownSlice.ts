import { RootState } from "@/app/store";
import { ICartList } from "@/types/cartType.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  isShowCart: boolean,
  isShowUserMenu: boolean,
}
const initialState: IInitialState = {
  isShowCart: false,
  isShowUserMenu: false,
};
const dropdownSlice = createSlice({
  name: "dropdown",
  initialState,
  reducers: {
    setShowCart(state: IInitialState) {
      state.isShowCart = !state.isShowCart
      if(state.isShowUserMenu)
      state.isShowUserMenu = !state.isShowUserMenu
    },
    setUserMenu(state: IInitialState) {
      state.isShowUserMenu = !state.isShowUserMenu
      if(state.isShowCart)
      state.isShowCart = !state.isShowCart
    }
  },
});
//action
export const { setShowCart, setUserMenu } = dropdownSlice.actions;
// reducer
export default dropdownSlice.reducer;
//state
export const selectDropdownList = (state: RootState) => state.dropDown;
