import {createContext} from "react";

export const CategoryContext = createContext({
    categories: [],
    fetched: true,
    getCategories: () => {},
    newCategory: () => {},
    deleteCategory: () => {}
});