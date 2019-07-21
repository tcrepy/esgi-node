import {createContext} from "react";

export const CategoryContext = createContext({
    categories: [],
    fetched: true,
    categorySelected: 0,
    getCategories: () => {},
    newCategory: () => {},
    deleteCategory: () => {},
    getById: () => {},
    handleChangeCategorySelected: () => {}
});