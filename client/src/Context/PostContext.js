import {createContext} from "react";

export const PostContext = createContext({
    search: "",
    posts: [],
    fetched: true,
    fetchList: () => {},
    NewPost: () => {},
    DeletePost: () => {},
    setSearch: () => {},
    handleSubmitSearch: () => {},
    like: () => {}
});