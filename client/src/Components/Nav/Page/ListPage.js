import React from 'react';
import {PostProvider} from "../../../Provider/PostProvider";
import {PostsList} from "../../TechWatch/PostsList";
import {CreateButton} from "../../TechWatch/action/CreateButton";

export const ListPage = () => {
    return <PostProvider>
        <PostsList/>
        <CreateButton/>
    </PostProvider>
};