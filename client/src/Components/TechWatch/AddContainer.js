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
        title_validation: "",
        link: "",
        link_validation: "",
        description: "",
        category: "",
        category_validation: ""
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
            error(err.toString());
            history.push(LinkConstants.LOGIN);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const {title, link, description, category} = state;
        if (check()) {
            context.NewPost(title, link, description, category).then(() => {
                setSubmitted(false);
                success('A new post has been added');
                history.push(LinkConstants.POST_LIST);
            }).catch(err => {
                setSubmitted(false);
                error(err);
            })
        } else {
            setSubmitted(false);
        }
    };

    const check = () => {
        setState(prevState => {
            return {
                ...prevState,
                title_validation: state.title === "" ? "Title can't be empty" : "",
                link_validation: state.link === "" ? "Link can't be empty" : "",
                category_validation: state.category === "" ? "Category can't be empty" : ""
            };
        });
        const regex = new RegExp(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/);
        const match = regex.exec(state.link);

        if (match === null) {
            setState(prevState => {
                return {...prevState, link_validation: "Please enter a valid URL (exemple: \"https://www.my-url.com\")"}
            });
            return false;
        }

        return state.title !== "" && state.title !== "" && state.title !== "";
    };

    return useMemo(() =>
        <AddForm {...state} handleChange={handleChange} handleSubmit={handleSubmit} submitted={submitted} categories={catContext.categories}/>, [context, catContext, state, submitted]);
});