import React from 'react';
import {PostProvider} from "../../../Provider/PostProvider";
import {List} from "../../TechWatch/List";
import {Create} from "../../TechWatch/action/Create";

export const ListPage = () => {
    return <PostProvider>
        <List/>
        <Create/>
    </PostProvider>
};