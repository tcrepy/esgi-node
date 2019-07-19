import React, {useState} from "react";
import {CategoryContext} from "../Context/CategoryContext";
import {categoryServices} from "../_services/CategoryServices";

export const CategoryProvider = ({children}) => {
    const [state, setState] = useState({
        categories: [],
        category: {},
        fetched: true,
        getCategories: () => {
            return categoryServices.getAll()
                .then(
                    data => {
                        setState(prevState => {
                            return {
                                ...prevState,
                                categories: data
                            }
                        });
                        return Promise.resolve(data);
                    },
                    error => {
                        throw new Error(error.toString());
                    }
                );
        },
        newCategory: ({title, description, color}) => {
            return categoryServices.save(title, description, color)
                .then(
                    data => {},
                    error => {}
                )
        },
        deleteCategory: () => {
        },
        getById: (id) => {
            return categoryServices.getById(id).then(category => {
                setState(prevState => {
                    return {...prevState, category: category}
                });
            }, err => {
                throw new Error(err.toString());
            })
        }
    });


    return <CategoryContext.Provider value={state}>
        {children}
    </CategoryContext.Provider>
};