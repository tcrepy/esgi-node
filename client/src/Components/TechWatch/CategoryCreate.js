import React, {useContext, useMemo, useState} from "react";
import {withAlert} from "../../Provider/AlertProvider";
import {LinkConstants} from "../../_constants/link.constants";
import {history} from "../../_helper/history";
import {CategoryContext} from "../../Context/CategoryContext";
import {CategoryForm} from "./Form/CategoryForm";

export const CategoryCreate = withAlert(({success, error}) => {
    const context = useContext(CategoryContext);
    const [state, setState] = useState({
        title: "",
        description: "",
        color: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };

    const handleChangeColor = (color) => {
        setState(prevState => {
            return {...prevState, color: color.hex}
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        context.newCategory(state)
            .then(() => {
                success('Category has been added');
                history.push(LinkConstants.CATEGORY_LIST);
            })
            .catch(err => {
                error(err.toString());
            })
            .finally(() => setSubmitted(false))
    };

    const {title, description, color} = state;
    return useMemo(() =>
        <CategoryForm title={title} color={color} setColor={handleChangeColor} description={description} handleChange={handleChange} handleSubmit={handleSubmit} submitted={submitted}/>, [state, submitted]);
});