import React, {useContext, useMemo, useState} from "react";
import {withAlert} from "../../Provider/AlertProvider";
import {AddForm} from "./Form/AddForm";
import {PostContext} from "../../Context/PostContext";
import {LinkConstants} from "../../_constants/link.constants";
import {history} from "../../_helper/history";

export const AddContainer = withAlert(({success, error}) => {
    const context = useContext(PostContext);
    const [state, setState] = useState({
        title: "",
        link: "",
        description: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value}
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const {title, link, description} = state;
        context.NewPost(title, link, description).then(() => {
            success('A new post has been added');
            history.push(LinkConstants.POST_LIST);
        }).catch(err => {
            error(err.toString());
            setSubmitted(false);
        });
    };

    const {title, link, description} = state;
    return useMemo(() => <AddForm title={title} link={link} description={description} handleChange={handleChange} handleSubmit={handleSubmit} submitted={submitted}/>, [state, submitted]);
});