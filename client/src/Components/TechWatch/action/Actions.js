import React from "react"
import {PostContext} from "../../../Context/PostContext";

export const Actions = ({item}) =>
    <PostContext.Consumer>
        {({DeletePost}) => <>
            <a onClick={() => DeletePost(item)}>✖</a>
        </>}
    </PostContext.Consumer>
;