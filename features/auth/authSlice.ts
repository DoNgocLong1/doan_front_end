import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type User = {
  email: string;
  image: any;
  roleId: number;
};

interface IInitialState {
  isAuthenticated: boolean;
  user: null | Omit<User, "image">;
}

const initialState: IInitialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state: IInitialState, action: PayloadAction<User>) => {
      const {image, ...user} = action.payload
      state.isAuthenticated = true;
      state.user = user;
    },
    logout: (state: IInitialState, action: PayloadAction<boolean>) => {
      console.log("logout");
      state.isAuthenticated = action.payload;
      state.user = null;
    },
  },
});
//action
export const { loginSuccess, logout } = authSlice.actions;
// reducer
export default authSlice.reducer;
//state
export const selectAuth = (state: RootState) => state.auth;
