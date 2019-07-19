import React, {useContext, useEffect, useMemo} from "react";
import {CategoryContext} from "../../Context/CategoryContext";
import Typography from "@material-ui/core/Typography";
import {PostsList} from "./PostsList";
import CardHeader from "@material-ui/core/CardHeader";

export const PostByCategory = (props) => {
    const context = useContext(CategoryContext);
    console.log(context);
    useEffect(() => {
        context.getById(props.match.params.id).catch(err => props.error(err.toString()));
    }, []);

    return useMemo(() => <><CardHeader title={context.category.title} subheader={context.category.description} align="center"/>
    <PostsList category={context.category}/>
    </>, [context.category])
};