import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IdataCategory } from '@/types/productType.type';
import { ICategory } from "@/types/index.type";

interface IInitialState {
  categoryList: IdataCategory[];
}

const initialState: IInitialState = {
  categoryList: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {

    getCategories: (state: IInitialState, action: PayloadAction<IdataCategory[]>) => {
      state.categoryList = [...action?.payload] || []
    },
    /* createCategory: (state: IInitialState, action: PayloadAction<ICategory>) => {
      state.categoryList = [...state.categoryList, action.payload]
      createCategory(categoryData)
    }, */
    deleteCategory: (state: IInitialState, action: PayloadAction<IdataCategory>) => {
      state.categoryList = [...state.categoryList, action.payload]
    },
    updateCategory: (state: IInitialState, action: PayloadAction<IdataCategory>) => {
      state.categoryList = [...state.categoryList, action.payload]
    },
  },
});
//action
export const { getCategories, deleteCategory, updateCategory } = categorySlice.actions;
// reducer
export default categorySlice.reducer;
//state
export const selectCategory = (state: RootState) => state.category;
