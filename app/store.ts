import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import categoryReducer from "@/features/admin/categorySlice";
import productReducer from "@/features/admin/productSlice";
import dropDownReducer from "@/features/dropDownSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer,
    dropDown: dropDownReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
