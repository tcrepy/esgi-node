import React, {useContext, useEffect, useMemo} from "react";
import {CategoryContext} from "../../Context/CategoryContext";
import {PostsList} from "./PostsList";
import CardHeader from "@material-ui/core/CardHeader";

export const PostByCategory = ({error, succes, category, user}) => {
    return useMemo(() => {
        return <>
            <CardHeader title={category ? category.title : "Post list"} subheader={category ? category.description : ""} align="center"/>
            <PostsList user={user} category={category}/>
        </>
    }, [category, user])
};