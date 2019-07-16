import {createContext} from "react";

export const PostContext = createContext({
    posts: [],
    fetched: true,
    fetchList: () => {},
    NewPost: () => {},
    DeletePost: () => {}
});