import {PostProvider} from "../../../../Provider/PostProvider";
import React from "react";
import {AddContainer} from "../../../TechWatch/AddContainer";

export const NewPostPage = () => {
    return <PostProvider>
        <AddContainer/>
    </PostProvider>
};