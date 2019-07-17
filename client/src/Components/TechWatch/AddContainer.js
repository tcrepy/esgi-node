import React, {useContext, useEffect, useMemo, useState} from "react";
import {withAlert} from "../../Provider/AlertProvider";
import {AddForm} from "./Form/AddForm";
import {PostContext} from "../../Context/PostContext";
import {LinkConstants} from "../../_constants/link.constants";
import {history} from "../../_helper/history";
import {CategoryContext} from "../../Context/CategoryContext";

export const AddContainer = withAlert(({success, error}) => {
    const context = useContext(PostContext);
    const catContext = useContext(CategoryContext);
    const [state, setState] = useState({
        title: "",
        link: "",
        description: "",
        category: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };

    useEffect(() => {
        catContext.getCategories().catch(err => {
            alert.error(err.toString());
            history.push(LinkConstants.LOGIN);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const {title, link, description, category} = state;
        context.NewPost(title, link, description, category).then(() => {
            success('A new post has been added');
            history.push(LinkConstants.POST_LIST);
        }).catch(err => {
            error(err);
        }).finally(() => {
            setSubmitted(false);
        });
    };

    const {title, link, description, category} = state;
    return useMemo(() =>
        <AddForm title={title} link={link} description={description} category={category} handleChange={handleChange} handleSubmit={handleSubmit} submitted={submitted} categories={catContext.categories}/>, [context, catContext, state]);
});